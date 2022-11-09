import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, connectAuthEmulator, signInWithCredential } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBERvghriZ2QFyxuFIBhqGRmUmqqOwiWSQ",
    authDomain: "react-tutorial-b8a41.firebaseapp.com",
    projectId: "react-tutorial-b8a41",
    storageBucket: "react-tutorial-b8a41.appspot.com",
    messagingSenderId: "805123204489",
    appId: "1:805123204489:web:05d8dffaf2c77c6496ad58",
    measurementId: "G-NQVZ0QCB4W"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "ZRhwMGDyjaW8Tu0AoO3h0VW7z7v1", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
}


export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};