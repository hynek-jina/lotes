import { selectAtom } from "jotai/utils";
import { atomWithMMKV } from "./atomWithMMKV";
import parseLnbitsUrl from "./utils/parseLnbitsUrl";
import fetchAdminKey from "./utils/fetchAdminKey";

interface UserInfo {
  domain: string;
  user: string;
  wallet: string;
}

export const lnbitsUrlAtom = atomWithMMKV<string | null>("lnbitsurl", null);

export const userInfoAtom = selectAtom(
  lnbitsUrlAtom,
  (lnbitsUrl): UserInfo | null => {
    if (!lnbitsUrl) return null;
    return parseLnbitsUrl(lnbitsUrl);
  }
);

export const adminKeyAtom = selectAtom(
  lnbitsUrlAtom,
  async (lnbitsUrl): Promise<string | null> => {
    if (!lnbitsUrl) return null;
    const adminKey = await fetchAdminKey(lnbitsUrl);
    return adminKey
  }
)
// export const adminKeyAtom = atomWithMMKV("adminKey", "");
export const loteAmountAtom = atomWithMMKV("loteAmount", 0);
