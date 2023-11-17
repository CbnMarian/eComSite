import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCFcGLkI0g5rkjqhKpZYdNt-57z98vWpEg",
  authDomain: "crwn-db-b4057.firebaseapp.com",
  projectId: "crwn-db-b4057",
  storageBucket: "crwn-db-b4057.appspot.com",
  messagingSenderId: "906533518249",
  appId: "1:906533518249:web:61eefa1a0031407ab762b8",
  measurementId: "G-Z9T64S05QK",
};

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

const app = initializeApp(config);

const auth = getAuth(app);
const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = () => signInWithPopup(auth, provider);

export { auth, firestore, signInWithGoogle, createUserProfileDocument };
export default app;
