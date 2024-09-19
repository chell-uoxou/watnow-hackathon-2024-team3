"use client";

import { collection } from "firebase/firestore";
import React from "react";
import { Button } from "~/components/ui/button";
import { useFirestore } from "~/hooks/useFirestore";
import { db } from "~/lib/firebase";
import Account from "~/models/types/account";

export default function Page() {
  const { add, list } = useFirestore(collection(db, "accounts"));

  const handleClick = async () => {
    const accounts = await list<Account>();
    await add(accounts[0]);
  };
  return (
    <div>
      <Button onClick={handleClick}>複製</Button>
    </div>
  );
}
