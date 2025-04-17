import { 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  query,
  where,
  getDocs,
  enableNetwork,
  disableNetwork,
  onSnapshot,
  DocumentSnapshot,
  SetOptions
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { User } from '../interfaces/User';

export interface UserData {
  email: string;
  whatsapp: string | null;
  nombre: string;
  apellido: string;
  password: string;
  ci: string;
  createdAt: string;
  premium?: boolean;
  expert?: boolean;
}

// Ensure authentication before any operation
const ensureAuth = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser;
};

// Network status management
export const goOffline = async () => {
  try {
    await disableNetwork(db);
    console.log('Network disabled - app is offline');
  } catch (error: any) {
    console.error('Error disabling network:', error);
    throw error;
  }
};

export const goOnline = async () => {
  try {
    await enableNetwork(db);
    console.log('Network enabled - app is online');
  } catch (error: any) {
    console.error('Error enabling network:', error);
    throw error;
  }
};

export const createUser = async (userData: UserData, options: SetOptions = { merge: true }) => {
  try {
    await ensureAuth();
    // Create user document in Firestore with merge option for offline scenarios
    await setDoc(doc(db, 'users', userData.ci), {
      ...userData,
      premium: false,
      expert: false
    }, options);
    return true;
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.code === 'unavailable') {
      console.log('Operation attempted while offline');
      // The write will be queued for when we're back online
      return true;
    }
    throw error;
  }
};

export const getUserByCi = async (ci: string): Promise<UserData | null> => {
  try {
    await ensureAuth();
    const userDocRef = doc(db, 'users', ci);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      // Document exists in cache or from server
      const source = userDoc.metadata.fromCache ? 'local cache' : 'server';
      console.log('Data came from ' + source);
      return userDoc.data() as UserData;
    }
    
    if (userDoc.metadata.fromCache) {
      // If we're offline and the doc doesn't exist in cache, return null instead of throwing
      console.log('Document not found in cache while offline');
      return null;
    }
    
    return null;
  } catch (error: any) {
    console.error('Error getting user:', error);
    // If we're offline, return null instead of throwing
    if (error.code === 'unavailable') {
      console.log('Currently offline, returning null');
      return null;
    }
    throw error;
  }
};

// Real-time listener for user data with offline support
export const subscribeToUser = (ci: string, onUpdate: (userData: UserData | null) => void) => {
  const userDocRef = doc(db, 'users', ci);
  
  return onSnapshot(userDocRef, 
    { includeMetadataChanges: true },
    (doc: DocumentSnapshot) => {
      if (doc.exists()) {
        const source = doc.metadata.fromCache ? 'local cache' : 'server';
        console.log('Data came from ' + source);
        onUpdate(doc.data() as UserData);
      } else {
        onUpdate(null);
      }
    },
    (error) => {
      console.error('Error listening to user updates:', error);
      // Don't throw here since this is an async listener
      onUpdate(null);
    }
  );
};

export const checkUserExists = async (ci: string): Promise<boolean> => {
  try {
    await ensureAuth();
    const userDoc = await getDoc(doc(db, 'users', ci));
    
    const source = userDoc.metadata.fromCache ? 'local cache' : 'server';
    console.log('Existence check data came from ' + source);
    
    return userDoc.exists();
  } catch (error: any) {
    console.error('Error checking user:', error);
    if (error.code === 'unavailable') {
      console.log('Currently offline, using cached data');
      return false;
    }
    throw error;
  }
};

export const formatUserForRedux = (userData: UserData): User => {
  return {
    id: userData.ci,
    email: userData.email,
    name: userData.nombre,
    lastName: userData.apellido,
    whatsapp: userData.whatsapp,
    ci: userData.ci,
    premium: userData.premium || false,
    expert: userData.expert || false
  };
}; 