import Account from "~/models/types/account";
import { useFirestoreCollection } from "./useFirestoreCollection";
import { collection } from "firebase/firestore";
import { db } from "~/lib/firebase";
import useAuthUser from "./useAuthUser";
import { useState } from "react";

const undefinedDefaultName = "名無しさん";

export default function useCurrentAccount() {
  const [currentDBAccount, setCurrentDBAccount] = useState<
    Account | null | "loading"
  >("loading");
  const accountDB = useFirestoreCollection<Account>(collection(db, "accounts"));
  const currentAuthUser = useAuthUser();

  if (currentAuthUser === "loading") {
    return "loading";
  } else if (currentAuthUser === null || accountDB === null) {
    return null;
  } else {
    accountDB.exists(currentAuthUser.uid).then(async (exists) => {
      if (!exists) {
        await accountDB.set(currentAuthUser.uid, {
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

      const account = await accountDB.get(currentAuthUser.uid);
      if (account === undefined) {
        throw new Error("Account not found （なんで？）");
      }

      setCurrentDBAccount(account);
    });
  }
  return currentDBAccount;
}

export const isReady = (
  currentAccount: ReturnType<typeof useCurrentAccount>
): currentAccount is Account => {
  return currentAccount !== "loading" && currentAccount !== null;
};
