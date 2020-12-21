import firebase from "firebase/app";

export const transformFirestoreQueryResultData = <DataType>(
  rawData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
): DataType[] => {
  const data = rawData.docs.map(transformRawFirestoreDocument) as (DataType & {
    id: string;
  })[];
  return data;
};

export const transformRawFirestoreDocument = <DataType>(
  rawData: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
): DataType => {
  const data = {
    ...rawData.data(),
    id: rawData.id,
  } as DataType & { id: string };

  return data;
};
