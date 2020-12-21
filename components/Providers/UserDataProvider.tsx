import * as React from "react";
import { RawFirestoreUser } from "../../firestore-collections";
import { transformFirestoreQueryResultData } from "../../lib/firebase/dataTransforms";
import { initializeFirebaseApp } from "../../lib/firebase/firebase";
import { User } from "../../types";
import { sanitizeUser } from "../../utils/sanitization";
import { useAuthContext } from "./AuthProvider";

interface UserDataContextValue {
  users: Record<string, User>;
}

const UserDataContext = React.createContext<UserDataContextValue | undefined>(
  undefined
);

const UserDataProvider: React.FC = (props) => {
  const [userData, setUserData] = React.useState<Record<string, User>>({});

  const { userAuthentication } = useAuthContext();

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (!userAuthentication) {
        return;
      }

      const { FirestoreInstance } = initializeFirebaseApp();
      const rawUsers = await FirestoreInstance.collection("users").get();
      const formattedUsers = transformFirestoreQueryResultData<RawFirestoreUser>(rawUsers);

      const usersRecord = formattedUsers
        .map(sanitizeUser)
        .reduce<Record<string, User>>((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

      setUserData(usersRecord);
    };

    fetchUserData();
  }, [userAuthentication]);

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
