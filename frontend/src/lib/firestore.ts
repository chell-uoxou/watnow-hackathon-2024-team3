import {
  FirestoreDataConverter,
  Primitive,
  WithFieldValue,
} from "firebase/firestore";

type WithUid<T> = {
  uid: string;
} & T;

/**
 * 作成時に使うConverter
 * db書き込み時: uidを取り除き、createdAtを追加します。
 * db読み取り時: uidを追加します。
 */
export const createConverter = <
  T extends Record<string, Primitive>
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithUid<WithFieldValue<T>>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uid, ...rest } = data;
    return {
      ...rest,
      createdAt: new Date(),
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options) as T;
    return {
      ...data,
      uid: snapshot.id,
    };
  },
});

/**
 * デフォルトのConverter。
 * db書き込み時: uidを取り除きますが、createdAtは追加しません。
 * db読み取り時: uidを追加します。
 */
export const defaultConverter = <
  T extends Record<string, Primitive>
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithUid<WithFieldValue<T>>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uid, ...rest } = data;
    return {
      ...rest,
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options) as T;
    return {
      ...data,
      uid: snapshot.id,
    };
  },
});
