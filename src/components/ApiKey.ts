import AsyncStorage from "@react-native-async-storage/async-storage";

export type ApiKey = string | null;

let apiKey: ApiKey | undefined = null;

export async function getApiKey(): Promise<ApiKey> {
  if (apiKey === undefined) {
    const newApiKey = (await AsyncStorage.getItem("apiKey")) ?? null;
    apiKey = newApiKey;
    return newApiKey;
  }
  return apiKey;
}

export function setApiKey(newApiKey: string): void {
  void AsyncStorage.setItem("apiKey", newApiKey);
  apiKey = newApiKey;
}
