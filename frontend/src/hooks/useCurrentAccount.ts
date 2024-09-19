import { Account } from "~/models/types/account";
import { useFirestoreCollection } from "./useFirestoreCollection";
import { collection, doc, DocumentReference } from "firebase/firestore";
import { db } from "~/lib/firebase";
import useAuthUser from "./useAuthUser";
import { useEffect, useState } from "react";
import useDBGroup, { getGroupDocRef } from "./useDBGroup";

const undefinedDefaultName = "名無しさん";
const temporaryGroupIdForDemo = "YqPvZW6JKURIcTjCR9FA"; // デモ用に新規登録したアカウントを放り込むグループのID

export default function useCurrentAccount() {
  const [currentDBAccount, setCurrentDBAccount] = useState<
    Account | null | "loading"
  >("loading");
  const {
    exists: accountExists,
    set: setAccount,
    get: getAccount,
  } = useFirestoreCollection<Account>(collection(db, "accounts"));
  const currentAuthUser = useAuthUser();
  const { existAccount, addMemberToGroup } = useDBGroup(
    getGroupDocRef(temporaryGroupIdForDemo)
  );

  useEffect(() => {
    if (currentAuthUser === "loading") return;
    if (currentAuthUser === null || accountExists === null) {
      setCurrentDBAccount(null);
    } else {
      // アカウントデータが存在しない場合は作成
      accountExists(currentAuthUser.uid).then(async (exists) => {
        if (!exists) {
          await setAccount(currentAuthUser.uid, {
            email: currentAuthUser.email ?? "",
            default_display_name:
              currentAuthUser.displayName ?? undefinedDefaultName,
            avatar_url: currentAuthUser.photoURL ?? "",
            password_hash: "",
            last_name: "",
            first_name: "",
            phone_number: "",
            address: "",
          });
        }

        const account = await getAccount(currentAuthUser.uid);
        if (account === undefined) {
          throw new Error("Account not found （なんで？）");
        }

        setCurrentDBAccount(account);

        // ついでに初回登録時、一旦勝手にDEMO用グループに放り込む
        if (!exists) {
          const accountRef = doc(
            db,
            "accounts",
            currentAuthUser.uid
          ) as DocumentReference<Account>;
          existAccount(accountRef).then((exists) => {
            if (!exists) {
              console.log(
                `adding ${currentAuthUser.displayName} to demo group {${temporaryGroupIdForDemo}}`
              );
              addMemberToGroup(accountRef, {
                display_name: currentAuthUser.displayName ?? "",
                notes: "自動追加されました",
              });
            } else {
              console.log(
                `already added to demo group {${temporaryGroupIdForDemo}}`
              );
            }
          });
        }
      });
    }
  }, [currentAuthUser, accountExists, getAccount, setAccount]);

  useEffect(() => {}, [currentDBAccount, existAccount, addMemberToGroup]);

  return currentDBAccount;
}

export const isReady = (
  currentAccount: ReturnType<typeof useCurrentAccount>
): currentAccount is Account => {
  return currentAccount !== "loading" && currentAccount !== null;
};
