import { SignJWT, jwtVerify, decodeJwt, JWTPayload as JoseJWTPayload } from 'jose';
import { StorageService } from './storageService';
import { USER_AUTH } from '../helpers/AuthConst';

const secretMessage = import.meta.env.VITE_SECRET_MESSAGE;
const JWT_SECRET = new TextEncoder().encode(secretMessage); // En producción, esto debería venir de variables de entorno
const TOKEN_EXPIRY = '30d'; // 30 días

interface JWTPayload {
  ci: string;
  exp?: number;
  iat?: number;
}

export const generateToken = async (userData: { ci: string }): Promise<string> => {
  const jwt = await new SignJWT({ ci: userData.ci })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
  
  return jwt;
};

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { ci: payload.ci as string, exp: payload.exp, iat: payload.iat } as JWTPayload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJwt(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export interface AuthStorage {
  ci: string;
  token: string;
  expiry: number;
}

export const storeAuthData = async (ci: string): Promise<AuthStorage> => {
  const token = await generateToken({ ci });
  const decoded = decodeJwt(token);
  
  const authData: AuthStorage = {
    ci,
    token,
    expiry: decoded.exp || 0
  };

  await StorageService.set(USER_AUTH, authData);
  return authData;
};

export const getStoredAuth = async (): Promise<AuthStorage | null> => {
  return StorageService.get<AuthStorage>(USER_AUTH);
};

export const clearAuth = async (): Promise<void> => {
  await StorageService.remove(USER_AUTH);
}; 