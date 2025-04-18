import { Preferences } from '@capacitor/preferences';

export class StorageService {
  static async set(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }

  static async get<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  static async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  static async clear(): Promise<void> {
    await Preferences.clear();
  }

  // Migración de localStorage a Preferences
  static async migrateFromLocalStorage(key: string): Promise<void> {
    const value = localStorage.getItem(key);
    if (value) {
      await this.set(key, JSON.parse(value));
      localStorage.removeItem(key);
    }
  }
} 