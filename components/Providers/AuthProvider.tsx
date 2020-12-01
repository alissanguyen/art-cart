import * as React from "react";
import { initializeFirebaseApp } from "../../lib/firebase/firebase";
import firebase from "firebase/app";
import { getFirstAndLastName } from "../../utils/sanitization";
import { LoggedInUser } from "../../types";

interface AuthContextValue {
  userAuthentication: LoggedInUser | null;
  login: (user: LoggedInUser) => void;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

const AuthProvider: React.FC = (props) => {
  const { FirebaseInstance } = initializeFirebaseApp();
  const [user, setUser] = React.useState<LoggedInUser | null>(null);

  React.useEffect(() => {
    FirebaseInstance.auth().onAuthStateChanged((user) => {
      if (user) {
        const parsedName =
          typeof user.displayName === "string"
            ? getFirstAndLastName(user.displayName)
            : undefined;

        setUser({
          id: user.uid,
          avatarUrl: user.photoURL,
          loggedInUtcTimestamp: Date.now(),
          username: user.displayName || "Anonymous User",
          firstName: parsedName?.firstName,
          lastName: parsedName?.lastName,
          favoritedArtworkIds: {},
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const login = setUser;

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthentication: user,
        login,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const contextValue = React.useContext(AuthContext);

  if (!contextValue) {
    throw new Error(
      "You are trying to use AuthContext without rendering its provider somewhere above this component in the component tree."
    );
  }

  return contextValue;
};

export default AuthProvider;
