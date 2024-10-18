"use client";

import { collection } from "firebase/firestore";
import React from "react";
import { Button } from "~/components/ui/button";
import { useFirestoreCollection } from "~/hooks/useFirestoreCollection";
import { db } from "~/lib/firebase";
import { DBAccount } from "~/lib/firestore/schemas";

export default function Page() {
  const accountDB = useFirestoreCollection<DBAccount>(
    collection(db, "accounts")
  );

  const handleClick = async () => {
    if (!accountDB) return;

    const accounts = await accountDB.list();
    console.log(accounts);
  };

  return (
    <div>
      <Button onClick={handleClick}>取得</Button>
    </div>
  );
}
