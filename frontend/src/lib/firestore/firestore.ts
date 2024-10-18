import { FirestoreDataConverter, WithFieldValue } from "firebase/firestore";

export type WithUid<T> = {
  uid: string;
} & T;

/**
 * 作成時に使うConverter
 * db書き込み時: uidを取り除き、created_atを追加します。
 * db読み取り時: uidを追加します。
 */
export const createConverter = <
  T extends object
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithUid<WithFieldValue<T>>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uid, ...rest } = data;
    return {
      ...rest,
      created_at: new Date(),
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
 * db書き込み時: uidを取り除きますが、created_atは追加しません。
 * db読み取り時: uidを追加します。
 */
export const defaultConverter = <
  T extends object
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
