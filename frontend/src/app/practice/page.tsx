/* eslint-disable */

"use client";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/lib/firebase";

export default function Page() {
  const [accounts, setAccounts] = useState<DocumentData[]>([]);
  const [accounts_event, setEvents] = useState<DocumentData[]>([]);

  useEffect(() => {
    const accountsData = collection(db, "accounts");
    const accounts_eventData = collection(db, "event_pool");
    getDocs(accountsData).then((snapshot) => {
      const accounts = snapshot.docs.map((doc) => doc.data());
      console.log("取得したよ");
      setAccounts(accounts);
    });

    getDocs(accounts_eventData).then((snapshot) => {
      const accounts = snapshot.docs.map((doc) => doc.data());
      console.log("取得したよ");
      // setEvents(accounts_eventData);
    });
  }, []);

  return (
    <div>
      practice
      <div>
        {accounts.map((account) => (
          <div key={account.address}>
            <p>{account.address}</p>
            <p>{account.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
