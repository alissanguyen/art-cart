import * as React from "react";
import { RawFirestoreUser } from "../../firestore-collections";
import { transformFirestoreData } from "../../lib/firebase/dataTransforms";
import { initializeFirebaseApp } from "../../lib/firebase/firebase";
import { sanitizeUser } from "../../utils/sanitization";

interface UserDataContextValue {
  users: Record<string, User>;
}

const UserDataContext = React.createContext<UserDataContextValue | undefined>(
  undefined
);

const UserDataProvider: React.FC = (props) => {
  const [userData, setUserData] = React.useState<Record<string, User>>({});

  React.useEffect(() => {
    const fetchUserData = async () => {
      const { FirestoreInstance } = initializeFirebaseApp();
      const rawUsers = await FirestoreInstance.collection("users").get();
      const formattedUsers = transformFirestoreData<RawFirestoreUser>(rawUsers);

      const usersRecord = formattedUsers
        .map(sanitizeUser)
        .reduce<Record<string, User>>((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

      setUserData(usersRecord);
    };

    fetchUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ users: userData }}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const userContextValue = React.useContext(UserDataContext);

  if (!userContextValue) {
    throw new Error(
      "You are trying to use userDataContext without rendering its provider somewhere above this component in the component tree."
    );
  }

  return userContextValue;
};

export default UserDataProvider;
