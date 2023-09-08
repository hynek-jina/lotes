import { atomWithMMKV } from "./atomWithMMKV";

export const apiKeyAtom = atomWithMMKV("apiKey", "");
export const serverAtom = atomWithMMKV("server", "");
export const loteAmountAtom = atomWithMMKV("loteAmount", 0);