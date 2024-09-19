import { Account } from "~/models/types/account";
import { useFirestoreCollection } from "./useFirestoreCollection";
import { collection } from "firebase/firestore";
import { db } from "~/lib/firebase";
import useAuthUser from "./useAuthUser";
import { useEffect, useState } from "react";

const undefinedDefaultName = "名無しさん";

export default function useCurrentAccount() {
  const [currentDBAccount, setCurrentDBAccount] = useState<
    Account | null | "loading"
  >("loading");
  const { exists, set, get } = useFirestoreCollection<Account>(
    collection(db, "accounts")
  );
  const currentAuthUser = useAuthUser();

  useEffect(() => {
    if (currentAuthUser === "loading") return;
    if (currentAuthUser === null || exists === null) {
      setCurrentDBAccount(null);
    } else {
      exists(currentAuthUser.uid).then(async (exists) => {
        if (!exists) {
          await set(currentAuthUser.uid, {
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

        const account = await get(currentAuthUser.uid);
        if (account === undefined) {
          throw new Error("Account not found （なんで？）");
        }

        setCurrentDBAccount(account);
      });
    }
  }, [currentAuthUser, exists, get, set]);

  return currentDBAccount;
}

export const isReady = (
  currentAccount: ReturnType<typeof useCurrentAccount>
): currentAccount is Account => {
  return currentAccount !== "loading" && currentAccount !== null;
};
