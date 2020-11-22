import firebase from "firebase/app";

export const transformFirestoreData = <DataType>(
  rawData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
): DataType[] => {
  const data = rawData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as (DataType & { id: string })[];
  return data;
};


