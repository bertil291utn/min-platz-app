import { openDB } from 'idb';

const DB_NAME = 'min-platz-db';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('user-data')) {
        db.createObjectStore('user-data', { keyPath: 'id' });
      }
    }
  });
};

export const saveData = async (storeName: string, data: any) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.objectStore(storeName).put(data);
  await tx.done;
};

export const getData = async (storeName: string, id: string) => {
  const db = await initDB();
  return db.transaction(storeName).objectStore(storeName).get(id);
};