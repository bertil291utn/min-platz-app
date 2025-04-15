import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { apiKey, appId, authDomain, messagingSenderId, projectId, storageBucket } from '../helpers/firebaseEnvVar';
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistence enabled
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 