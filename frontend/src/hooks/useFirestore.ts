import {
  addDoc,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  WithFieldValue,
} from "firebase/firestore";
import { useMemo } from "react";
import { createConverter, defaultConverter } from "~/lib/firestore";

export const useFirestore = (collection: CollectionReference) => {
  const add = useMemo(
    () =>
      async function <T extends WithFieldValue<DocumentData>>(data: T) {
        return await addDoc(
          collection.withConverter(createConverter<T>()),
          data
        );
      },
    [collection]
  );

  const set = useMemo(
    () =>
      async function <T extends WithFieldValue<DocumentData>>(
        docId: string,
        data: T
      ) {
        const newDoc = doc(collection, docId).withConverter(
          defaultConverter<T>()
        );
        return await setDoc(newDoc, data);
      },
    [collection]
  );

  const update = useMemo(
    () =>
      async function <T extends WithFieldValue<DocumentData>>(
        docId: string,
        data: Partial<T>
      ) {
        const newDoc = doc(collection, docId).withConverter(
          defaultConverter<T>()
        );
        return await setDoc(newDoc, data, { merge: true });
      },
    [collection]
  );

  const get = useMemo(
    () =>
      async function <T extends DocumentData>(docId: string) {
        const docRef = doc(
          collection.withConverter(defaultConverter<T>()),
          docId
        );
        const snapshot = await getDoc(docRef);
        return snapshot.data();
      },
    [collection]
  );

  const list = useMemo(
    () =>
      async function <T extends DocumentData>() {
        const snapshot = await getDocs(
          collection.withConverter(defaultConverter<T>())
        );
        return snapshot.docs.map((doc) => doc.data());
      },
    [collection]
  );

  const del = useMemo(
    () =>
      async function (docId: string) {
        const docRef = doc(collection, docId);
        return await deleteDoc(docRef);
      },
    [collection]
  );

  return { add, set, update, get, list, del };
};
