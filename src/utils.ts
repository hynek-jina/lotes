import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function atomWithAsyncStorage<T>(key: string, defaultValue: T) {
    const storage = createJSONStorage<T>(() => AsyncStorage)
    return atomWithStorage('apiKey', defaultValue, storage)
}
