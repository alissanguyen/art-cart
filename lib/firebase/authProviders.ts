import firebase from "firebase/app";
import { LoggedInUser } from "../../types";
import { getFirstAndLastName } from "../../utils/sanitization";
import { FirebaseInstance, initializeFirebaseApp } from "./firebase";

interface KnownGithubCredentialProperties {
  credential: {
    accessToken: string;
  };
  additionalUserInfo: {
    profile: null | {
      avatar_url: string;
      name: string;
    };
    isNewUser: boolean;
  };
}

export const signInWithGithub = async (): Promise<LoggedInUser> => {
  const { FirestoreInstance, FirebaseInstance } = initializeFirebaseApp();

  const FirebaseGithubProvider = new firebase.auth.GithubAuthProvider();
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.

  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  
  const loginResult = (await firebase
    .auth()
    .signInWithPopup(
      FirebaseGithubProvider
    )) as KnownGithubCredentialProperties & firebase.auth.UserCredential;

  if (!loginResult || !loginResult.user) {
    throw new Error("Failed to Login");
  }

  /**
   * 1. We want to also create a document in the users collection in Firestore if one doesn't already exist for this user.
   * 2. Use the GitHub first name and last name as the display name. this can be undefined so default it to anonymous later
   * 3. BONUS TODO: let users change their display name in their profile settings page.
   */
  const rawFirestoreUser = await FirestoreInstance.collection("users")
    .doc(loginResult.user.uid)
    .set({
      display_name: loginResult.user.displayName,
      bio: "",
    });

  const credentials = firebase.auth.GithubAuthProvider.credential(
    loginResult.credential.accessToken
  );

  const parsedName =
    typeof loginResult.additionalUserInfo?.profile?.name === "string"
      ? getFirstAndLastName(loginResult.additionalUserInfo?.profile?.name)
      : undefined;

  return {
    id: loginResult.user.uid,
    avatarUrl: loginResult.additionalUserInfo?.profile?.avatar_url || null,
    loggedInUtcTimestamp: Date.now(),
    username: loginResult.user?.displayName ?? "Anonymous User",
    firstName: parsedName?.firstName,
    lastName: parsedName?.lastName,
    favoritedArtworkIds: {},
  };
};
