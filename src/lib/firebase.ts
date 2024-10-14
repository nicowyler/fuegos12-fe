// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'fuegos-12-de-julio.firebaseapp.com',
  projectId: 'fuegos-12-de-julio',
  storageBucket: 'fuegos-12-de-julio.appspot.com',
  messagingSenderId: '205729561177',
  appId: appId,
  measurementId: 'G-NEVFH20NVS',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
getAnalytics(app);

export const getFirebaseErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'El correo electrónico ya está registrado.',
    'auth/invalid-email': 'El formato del correo electrónico es inválido.',
    'auth/weak-password': 'La contraseña es muy débil.',
    'auth/user-disabled': 'La cuenta ha sido deshabilitada.',
    'auth/user-not-found': 'No se encontró una cuenta con ese correo.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    // Add other Firebase error codes here
    default: 'Ocurrió un error. Inténtalo de nuevo.',
  };
  return errorMessages[errorCode] || errorMessages.default;
};
