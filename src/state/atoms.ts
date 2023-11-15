import {selectAtom} from 'jotai/utils'
import {atomWithMMKV} from '../utils/atomWithMMKV'
import fetchAdminKey from '../utils/fetchAdminKey'
import parseLnbitsUrl from '../utils/parseLnbitsUrl'

interface UserInfo {
  domain: string
  user: string
  wallet: string
}

export const lnbitsUrlAtom = atomWithMMKV<string | null>('lnbitsurl', null)

export const userInfoAtom = selectAtom(
  lnbitsUrlAtom,
  (lnbitsUrl): UserInfo | null => {
    if (!lnbitsUrl) return null
    return parseLnbitsUrl(lnbitsUrl)
  }
)

export const adminKeyAtom = selectAtom(
  lnbitsUrlAtom,
  async (lnbitsUrl): Promise<string | null> => {
    if (!lnbitsUrl) return null
    const adminKey = await fetchAdminKey(lnbitsUrl)
    return adminKey
  }
)
export const loteAmountAtom = atomWithMMKV('loteAmount', 0)
export const nfcModalVisibilityAtom = atomWithMMKV('nfcModalVisibility', false)
export const nfcModalMessageAtom = atomWithMMKV(
  'nfcModalMessage',
  'Scan the Lote'
)
