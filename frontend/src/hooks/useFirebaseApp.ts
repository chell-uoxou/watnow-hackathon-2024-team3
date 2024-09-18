
import { FirebaseContext } from "~/routes/_app";
import { useContext } from "react"

export const useFirebaseApp = () => {
    const firebaseApp = useContext(FirebaseContext)
    if (firebaseApp === null) {
        throw new Error('useFirebaseApp must be used within a FirebaseProvider')
    }
    return firebaseApp
}