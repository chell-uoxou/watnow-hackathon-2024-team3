import { CollectionReference, DocumentReference } from "firebase/firestore";
import { useRef } from "react";

// ジェネリクス T を使って、CollectionReference または DocumentReference 型を指定
export default function useFirestoreRefMemo<
  T extends CollectionReference | DocumentReference | null
>(collection: T) {
  const collectionOnLastRender = useRef<T | null>(null);

  // collectionのpathが変更されたら更新
  if (collection?.path !== collectionOnLastRender.current?.path) {
    collectionOnLastRender.current = collection;
  }

  // collectionがnullでない場合、最新のrefを返す
  return collection !== null ? collectionOnLastRender.current : null;
}
