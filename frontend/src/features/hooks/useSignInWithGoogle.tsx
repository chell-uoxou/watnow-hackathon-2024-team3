import { signInWithPopup } from "firebase/auth";
import { provider } from "../utils/googleSignInProvider";
import { useCallback } from "react";
import "~/lib/firebase";
import { auth } from "~/lib/firebase";

export default function useSignInWithGoogle() {
  return useCallback(() => signInWithPopup(auth, provider), []);
}
