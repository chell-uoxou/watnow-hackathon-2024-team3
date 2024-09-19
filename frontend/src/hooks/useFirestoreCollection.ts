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

export const useFirestoreCollection = <T extends WithFieldValue<DocumentData>>(
  collection: CollectionReference | null
) => {
  const add = useMemo(
    () =>
      async function (data: Omit<T, "uid">) {
        if (collection === null) return null;

        return await addDoc(
          collection.withConverter(createConverter<T>()),
          data
        );
      },
    [collection]
  );

  const set = useMemo(
    () =>
      async function (docId: string, data: T) {
        if (collection === null) return null;

        const newDoc = doc(collection, docId).withConverter(
          defaultConverter<T>()
        );
        return await setDoc(newDoc, data);
      },
    [collection]
  );

  const update = useMemo(
    () =>
      async function (docId: string, data: Partial<T>) {
        if (collection === null) return null;

        const newDoc = doc(collection, docId).withConverter(
          defaultConverter<T>()
        );
        return await setDoc(newDoc, data, { merge: true });
      },
    [collection]
  );

  const get = useMemo(
    () =>
      async function (docId: string) {
        if (collection === null) return null;

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
      async function () {
        if (collection === null) return null;

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
        if (collection === null) return null;

        const docRef = doc(collection, docId);
        return await deleteDoc(docRef);
      },
    [collection]
  );

  const exists = useMemo(
    () =>
      async function (docId: string) {
        if (collection === null) return null;

        const docRef = doc(collection, docId);
        const snapshot = await getDoc(docRef);
        return snapshot.exists();
      },
    [collection]
  );

  if (collection === null) {
    return null;
  }

  return { add, set, update, get, list, del, exists };
};
