"use client";

import { collection } from "firebase/firestore";
import React from "react";
import { Button } from "~/components/ui/button";
import { useFirestoreCollection } from "~/hooks/useFirestoreCollection";
import { db } from "~/lib/firebase";
import EventPool from "~/models/types/event_pool";

export default function Page() {
  const accountDB = useFirestoreCollection<EventPool>(
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
