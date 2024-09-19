"use client";

import { User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { auth } from "~/lib/firebase";

export default function useAuthUser() {
  const [authUser, setAuthUser] = useState<User | null | "loading">("loading");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });
    return unsubscribe;
  });

  return useMemo(() => authUser, [authUser]);
}
