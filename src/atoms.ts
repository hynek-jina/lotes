import { selectAtom } from "jotai/utils";
import { atomWithMMKV } from "./atomWithMMKV";
import parseLnbitsUrl from "./utils/parseLnbitsUrl";

export const apiKeyAtom = atomWithMMKV("apiKey", "");
export const serverAtom = atomWithMMKV("server", "");

interface UserInfo {
  domain: string;
  user: string;
  wallet: string;
}

export const lnbitsUrlAtom = atomWithMMKV<string | null>("lnbitsurl", null);

export const userInfoAtom = selectAtom(
  lnbitsUrlAtom,
  (url): UserInfo | null => {
    if (!url) return null;
    return parseLnbitsUrl(url);
  }
);

// export const domainAtom = selectAtom(userInfoAtom, (info) => info?.domain ?? "");

export const adminKeyAtom = atomWithMMKV("adminKey", "");

export const loteAmountAtom = atomWithMMKV("loteAmount", 0);
