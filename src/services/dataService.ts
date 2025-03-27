import { saveData, getData } from '../utils/db';

export const saveAppState = async (state: any) => {
  await saveData('user-data', { id: 'app-state', ...state });
};

export const loadAppState = async () => {
  return await getData('user-data', 'app-state');
};