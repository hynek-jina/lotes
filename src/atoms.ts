import { atomWithMMKV } from "./atomWithMMKV";

export const apiKeyAtom = atomWithMMKV("apiKey", "");
export const serverAtom = atomWithMMKV("server", "");


interface UserInfo {
  domain: string
  user: string
  wallet: string
}

export const lnbitsUrlAtom = atomWithMMKV<string | null>("lnbitsurl", null)

export const userInfoAtom = selectAtom(lnbitsUrlAtom, (url) => {
  if(!url) return null
  return parseLnbitsUrl(url)
})
export const domainAtom = atomWithMMKV("domain", "");
export const userAtom = atomWithMMKV("user", "");
export const walletAtom = atomWithMMKV("wallet", "");
export const adminKeyAtom = atomWithMMKV("adminKey", "");

export const loteAmountAtom = atomWithMMKV("loteAmount", 0);