import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createEmptyData,
  type AppData,
  type StorageAdapter,
} from "@goal-tracker/rules";

const STORAGE_KEY = "goal-tracker/app-data/v1";

export const phoneStorage: StorageAdapter = {
  async load() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AppData;
    } catch {
      return null;
    }
  },
  async save(data) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};

export async function loadAppData(): Promise<AppData> {
  return (await phoneStorage.load()) ?? createEmptyData();
}

export async function saveAppData(data: AppData): Promise<void> {
  await phoneStorage.save(data);
}
