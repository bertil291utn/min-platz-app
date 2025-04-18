import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Capacitor } from '@capacitor/core';
import { StorageService } from './storageService';

// Clave para encriptación web
const WEB_ENCRYPTION_KEY = import.meta.env.VITE_SECRET_MESSAGE;

class SecureStorageService {
  private static isNative = Capacitor.isNativePlatform();

  // Función auxiliar para encriptar datos en web
  private static async encryptForWeb(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(WEB_ENCRYPTION_KEY);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = encoder.encode(data);

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encodedData
    );

    const encryptedArray = new Uint8Array(encryptedData);
    const resultArray = new Uint8Array(iv.length + encryptedArray.length);
    resultArray.set(iv);
    resultArray.set(encryptedArray, iv.length);

    return btoa(String.fromCharCode(...resultArray));
  }

  // Función auxiliar para desencriptar datos en web
  private static async decryptForWeb(encryptedData: string): Promise<string> {
    const decoder = new TextDecoder();
    const keyData = new TextEncoder().encode(WEB_ENCRYPTION_KEY);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      data
    );

    return decoder.decode(decryptedData);
  }

  static async setSecure(key: string, value: any): Promise<void> {
    const stringValue = JSON.stringify(value);

    if (this.isNative) {
      // Usar Secure Storage nativo en dispositivos móviles
      await SecureStoragePlugin.set({
        key,
        value: stringValue
      });
    } else {
      // Usar encriptación web para navegadores
      const encryptedValue = await this.encryptForWeb(stringValue);
      await StorageService.set(`secure_${key}`, encryptedValue);
    }
  }

  static async getSecure<T>(key: string): Promise<T | null> {
    try {
      let value: string | null;

      if (this.isNative) {
        // Obtener de Secure Storage nativo
        const result = await SecureStoragePlugin.get({ key });
        value = result.value;
      } else {
        // Obtener y desencriptar en web
        const encryptedValue = await StorageService.get<string>(`secure_${key}`);
        if (!encryptedValue) return null;
        value = await this.decryptForWeb(encryptedValue);
      }

      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Error getting secure value:', error);
      return null;
    }
  }

  static async removeSecure(key: string): Promise<void> {
    if (this.isNative) {
      await SecureStoragePlugin.remove({ key });
    } else {
      await StorageService.remove(`secure_${key}`);
    }
  }

  static async clearSecure(): Promise<void> {
    if (this.isNative) {
      await SecureStoragePlugin.clear();
    } else {
      // Implementar lógica para limpiar solo las claves seguras en web
      // TODO: Implementar si es necesario
    }
  }
}

export { SecureStorageService }; 