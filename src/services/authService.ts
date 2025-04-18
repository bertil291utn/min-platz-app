import { SignJWT, jwtVerify, decodeJwt, JWTPayload as JoseJWTPayload } from 'jose';
import { StorageService } from './storageService';
import { SecureStorageService } from './secureStorageService';
import { USER_AUTH } from '../helpers/AuthConst';

const secretMessage = import.meta.env.VITE_SECRET_MESSAGE;
const JWT_SECRET = new TextEncoder().encode(secretMessage); // En producción, esto debería venir de variables de entorno
const TOKEN_EXPIRY = '30d'; // 30 días

interface JWTPayload {
  ci: string;
  exp?: number;
  iat?: number;
}

export const generateToken = async (payload: JWTPayload): Promise<string> => {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
  return token;
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const verifiedPayload = payload as unknown as JWTPayload;
    if (!verifiedPayload.ci) {
      throw new Error('Token inválido: falta CI');
    }
    return verifiedPayload;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJwt(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
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

  await SecureStorageService.setSecure(USER_AUTH, authData);
  return authData;
};

export const getStoredAuth = async (): Promise<AuthStorage | null> => {
  return SecureStorageService.getSecure<AuthStorage>(USER_AUTH);
};

export const clearAuth = async (): Promise<void> => {
  await SecureStorageService.removeSecure(USER_AUTH);
}; 