import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCFcGLkI0g5rkjqhKpZYdNt-57z98vWpEg",
  authDomain: "crwn-db-b4057.firebaseapp.com",
  projectId: "crwn-db-b4057",
  storageBucket: "crwn-db-b4057.appspot.com",
  messagingSenderId: "906533518249",
  appId: "1:906533518249:web:61eefa1a0031407ab762b8",
  measurementId: "G-Z9T64S05QK",
};

const app = initializeApp(config);

const auth = getAuth(app);
const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = () => signInWithPopup(auth, provider);

const createUserProfileDocument = async (
  userAuth,
  additionalData,
  updateStateCallback
) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  // Use onSnapshot to listen to changes in the document
  const unsubscribe = onSnapshot(userRef, (snapShot) => {
    if (updateStateCallback && typeof updateStateCallback === "function") {
      updateStateCallback({
        currentUser: {
          id: snapShot.id,
          ...snapShot.data(),
        },
      });
    }
  });

  return unsubscribe; // Return the unsubscribe function
};

export {
  auth,
  firestore,
  signInWithGoogle,
  createUserProfileDocument,
  createUserWithEmailAndPassword,
};
export default app;
