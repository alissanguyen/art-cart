import firebase from "firebase/app";
import "firebase/auth";

export let FirebaseInstance: firebase.app.App | null = null;

export const initializeFirebaseApp = () => {
  if (!FirebaseInstance) {
    FirebaseInstance = firebase.initializeApp(FIREBASE_CONFIG);
  }
};


const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAYRAbU_RGrjvENgJUJNMR1UFRuCnWF598",
  authDomain: "artcart-64f44.firebaseapp.com",
  databaseURL: "https://artcart-64f44.firebaseio.com",
  projectId: "artcart-64f44",
  storageBucket: "artcart-64f44.appspot.com",
  messagingSenderId: "450628220561",
  appId: "1:450628220561:web:ad7149265048a76a89f130",
} as const;
