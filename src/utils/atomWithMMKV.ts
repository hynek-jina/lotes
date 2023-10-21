import {type PrimitiveAtom} from 'jotai'
import {atomWithStorage, createJSONStorage} from 'jotai/utils'
import {MMKV} from 'react-native-mmkv'

const storage = new MMKV()

function getItem<T>(key: string): T | null {
  const value = storage.getString(key)
  return value ? JSON.parse(value) : null
}

function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value))
}

function removeItem(key: string): void {
  storage.delete(key)
}

function clearAll(): void {
  storage.clearAll()
}

export function atomWithMMKV<T>(
  key: string,
  initialValue: T
): PrimitiveAtom<T> {
  return atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    }))
  )
}
