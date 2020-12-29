import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export let FirebaseInstance: firebase.app.App | null = null;

export let FirestoreInstance: firebase.firestore.Firestore;


export const initializeFirebaseApp = () => {
  if (!FirebaseInstance && !firebase.apps.length) {
    FirebaseInstance = firebase.initializeApp(FIREBASE_CONFIG);
    FirestoreInstance = FirebaseInstance.firestore();

  }

  if (!FirebaseInstance) {
    FirebaseInstance = firebase.apps[0];
  }

  if (!FirebaseInstance) {
    throw new Error("Failed to initialize Firebase instance.");
  }

  return {
    FirebaseInstance,
    FirestoreInstance,
  };
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


export const EXTANT_FIELD_VALUE = firebase.firestore.FieldValue