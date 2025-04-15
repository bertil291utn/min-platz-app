import { 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../config/firebase';
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

export const createUser = async (userData: UserData) => {
  try {
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userData.ci), {
      ...userData,
      premium: false,
      expert: false
    });
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByCi = async (ci: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', ci));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const checkUserExists = async (ci: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', ci));
    return userDoc.exists();
  } catch (error) {
    console.error('Error checking user:', error);
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