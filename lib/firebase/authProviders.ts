import firebase from "firebase/app";

export const signInWithGithub = async (): Promise<LoggedInUser> => {
  const FirebaseGithubProvider = new firebase.auth.GithubAuthProvider();
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  const loginResult = await firebase
    .auth()
    .signInWithPopup(FirebaseGithubProvider);

  const accessToken = loginResult?.credential?.accessToken;

  console.log(loginResult);

  return {
    accessToken,
    avatarUrl: loginResult.additionalUserInfo?.profile.avatar_url,
    isNewUser: loginResult.additionalUserInfo?.isNewUser ?? false,
    loggedInUtcTimestamp: Date.now(),
    username: loginResult.user?.displayName ?? "Anonymous User",
    firstName:
      typeof loginResult.additionalUserInfo?.profile?.name === "string"
        ? loginResult.additionalUserInfo.profile?.name.split(" ")[0]
        : undefined,
    lastName:
      typeof loginResult.additionalUserInfo?.profile?.name === "string"
        ? loginResult.additionalUserInfo.profile?.name.split(" ")[1]
        : undefined,
  };
};
