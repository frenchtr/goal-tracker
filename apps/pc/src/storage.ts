import {
  createEmptyData,
  type AppData,
  type StorageAdapter,
} from "@goal-tracker/rules";

const STORAGE_KEY = "goal-tracker/app-data/v1";

export const pcStorage: StorageAdapter = {
  async load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AppData;
    } catch {
      return null;
    }
  },
  async save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};

export async function loadAppData(): Promise<AppData> {
  return (await pcStorage.load()) ?? createEmptyData();
}

export async function saveAppData(data: AppData): Promise<void> {
  await pcStorage.save(data);
}
