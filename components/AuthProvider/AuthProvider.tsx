import * as React from "react";

interface AuthContextValue {
  user: LoggedInUser | null;
  login: (user: LoggedInUser) => void;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

const AuthProvider: React.FC = (props) => {
  const [user, setUser] = React.useState<LoggedInUser | null>(null);

  const login = setUser;

  const logOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
