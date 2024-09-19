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
import { useCallback, useRef } from "react";
import { createConverter, defaultConverter } from "~/lib/firestore";

/**
 * FirestoreのCollectionReferenceを受け取り、そのコレクションに対する操作を行うフックを返す
 * nullが来たら、それぞれの操作関数にnullを代入したものを返す
 * （フックの引数のコレクションが未readyな時にnullを渡せば、返り値に伝播ができる）
 */
export const useFirestoreCollection = <T extends WithFieldValue<DocumentData>>(
  collection: CollectionReference | null
) => {
  const collectionOnLastRender = useRef<CollectionReference | null>(null);

  if (collection?.path !== collectionOnLastRender.current?.path) {
    collectionOnLastRender.current = collection;
  }

  const add = useCallback(async function (data: Omit<T, "uid">) {
    if (collectionOnLastRender.current === null) return null;

    return await addDoc(
      collectionOnLastRender.current.withConverter(
        createConverter<Omit<T, "uid">>()
      ),
      data
    );
  }, []);

  const set = useCallback(async function (docId: string, data: Omit<T, "uid">) {
    if (collectionOnLastRender.current === null) return null;

    const newDoc = doc(collectionOnLastRender.current, docId).withConverter(
      defaultConverter<Omit<T, "uid">>()
    );
    return await setDoc(newDoc, data);
  }, []);

  const update = useCallback(async function (docId: string, data: Partial<T>) {
    if (collectionOnLastRender.current === null) return null;

    const newDoc = doc(collectionOnLastRender.current, docId).withConverter(
      defaultConverter<T>()
    );
    return await setDoc(newDoc, data, { merge: true });
  }, []);

  const get = useCallback(async function (docId: string) {
    if (collectionOnLastRender.current === null) return null;

    const docRef = doc(
      collectionOnLastRender.current.withConverter(defaultConverter<T>()),
      docId
    );
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }, []);

  const list = useCallback(async function () {
    if (collectionOnLastRender.current === null) return null;

    const snapshot = await getDocs(
      collectionOnLastRender.current.withConverter(defaultConverter<T>())
    );
    return snapshot.docs.map((doc) => doc.data());
  }, []);

  const del = useCallback(async function (docId: string) {
    if (collectionOnLastRender.current === null) return null;

    const docRef = doc(collectionOnLastRender.current, docId);
    return await deleteDoc(docRef);
  }, []);

  const exists = useCallback(async function (docId: string) {
    if (collectionOnLastRender.current === null) return null;

    const docRef = doc(collectionOnLastRender.current, docId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists();
  }, []);

  return { add, set, update, get, list, del, exists };
};