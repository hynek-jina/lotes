import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import urlJoin from 'url-join'
import {
  adminKeyAtom,
  isFetchingAtom,
  lastFetchedAtom,
  refreshCounterAtom,
  userInfoAtom,
} from './state/atoms'

interface Api {
  getBalance: () => Promise<number>
  getRecords: () => Promise<RecordsApi>
  getInvoice: (amount: number) => Promise<string>
  scanLnurl: (lnurl: string) => Promise<scanLnurlApiResponse>
  requestPayment: (scanCallback: string, invoice: string) => Promise<boolean>
  createLnurl: (amount: number) => Promise<string>
  deleteLnurl: (id: string) => Promise<boolean>
}

interface CreateUser {
  id: string
  name: string
  user: string
  adminkey: string
  inkey: string
  currency: null
  balance_msat: number
  deleted: boolean
}

interface getBalanceApiResponse {
  id: string
  name: string
  balance: number
}

interface getInvoiceApiResponse {
  payment_hash: string
  payment_request: string
  checking_id: string
  lnurl_response: string
}

export interface scanLnurlApiResponse {
  domain: string
  tag: string
  callback: string
  k1: string
  minWithdrawable: number
  maxWithdrawable: number
  defaultDescription: string
  kind: string
  fixed: boolean
}

export interface RecordApi {
  id: string
  wallet: string
  title: string
  min_withdrawable: number
  max_withdrawable: number
  uses: number
  wait_time: number
  is_unique: boolean
  unique_hash: string
  k1: string
  open_time: number
  used: number
  usescsv: number
  number: number
  webhook_url: string
  webhook_headers: string
  webhook_body: string
  custom_url: string
  lnurl: string
}

export interface RecordsApi {
  records: RecordApi[]
}

export async function createUser(): Promise<CreateUser> {
  try {
    const result: Response = await fetch('https://lnbits.cz/api/v1/account', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Lotes',
      }),
    })
    if (!result.ok) {
      throw new Error(
        `Failed to create a new user. Status: ${result.status} - ${result.statusText}`
      )
    }

    const data = await result.json()
    return data
  } catch (error) {
    throw new Error(`API call error: ${(error as any).message}`)
  }
}

export function useApiCalls(): Api {
  const setIsFetching = useSetAtom(isFetchingAtom)
  const setLastFetched = useSetAtom(lastFetchedAtom)
  const [refreshCounter, setRefreshCounter] = useAtom(refreshCounterAtom)
  const apiKey = useAtomValue(adminKeyAtom)
  const userInfo = useAtomValue(userInfoAtom)
  const domain = userInfo?.domain ?? ''

  return {
    getBalance: async (): ReturnType<Api['getBalance']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      setIsFetching(true)
      setLastFetched('getBalance')
      const result: Response = await fetch(urlJoin(domain, '/api/v1/wallet'), {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      })

      if (!result.ok) {
        setIsFetching(false)
        throw new Error(
          `Failed to fetch wallet balance. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: getBalanceApiResponse = await result.json()
      setIsFetching(false)
      return json.balance / 1000
    },
    getInvoice: async (amount: number): ReturnType<Api['getInvoice']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      setIsFetching(true)
      setLastFetched('getInvoice')
      const result: Response = await fetch(
        urlJoin(domain, '/api/v1/payments'),
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': apiKey,
          },
          body: JSON.stringify({out: false, amount, memo: 'Lotes'}),
        }
      )

      if (!result.ok) {
        setIsFetching(false)
        throw new Error(
          `Failed to generate an invoice. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: getInvoiceApiResponse = await result.json()
      setIsFetching(false)

      return json.payment_request
    },
    scanLnurl: async (lnurl: string): ReturnType<Api['scanLnurl']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      setIsFetching(true)
      setLastFetched('scanLnurl')
      const url = urlJoin(domain, '/api/v1/lnurlscan/', lnurl)
      const result: Response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey,
        },
      })

      if (!result.ok) {
        setIsFetching(false)
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: scanLnurlApiResponse = await result.json()
      setIsFetching(false)

      return json
    },
    requestPayment: async (
      scanCallback: string,
      invoice: string
    ): ReturnType<Api['requestPayment']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      setIsFetching(true)
      setLastFetched('requestPayment')
      const result: Response = await fetch(`${scanCallback}&pr=${invoice}`)

      if (!result.ok) {
        setIsFetching(false)
        setRefreshCounter(refreshCounter + 1)
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }
      setIsFetching(false)
      return true
    },
    createLnurl: async (amount: number): ReturnType<Api['createLnurl']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      setIsFetching(true)
      setLastFetched('createLnurl')
      const result: Response = await fetch(
        urlJoin(domain, '/withdraw/api/v1/links'),
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': apiKey,
          },
          body: JSON.stringify({
            title: 'Lotes',
            min_withdrawable: amount,
            max_withdrawable: amount,
            uses: 1,
            wait_time: 1,
            is_unique: true,
          }),
        }
      )

      if (!result.ok) {
        setIsFetching(false)
        throw new Error(
          `Failed to create lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: RecordApi = await result.json()
      setIsFetching(false)
      setRefreshCounter(refreshCounter + 1)

      return json.lnurl
    },
    getRecords: async (): ReturnType<Api['getRecords']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }
      setIsFetching(true)
      setLastFetched('getRecords')
      const result: Response = await fetch(
        urlJoin(domain, '/withdraw/api/v1/links'),
        {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey,
          },
        }
      )

      if (!result.ok) {
        setIsFetching(false)
        throw new Error(
          `Failed to create lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: RecordApi[] = await result.json()
      setIsFetching(false)
      return {records: json}
    },

    deleteLnurl: async (id: string): Promise<boolean> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      setIsFetching(true)
      setLastFetched('getRecords')
      const result: Response = await fetch(
        urlJoin(domain, '/withdraw/api/v1/links/', id),
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': apiKey,
          },
        }
      )
      setIsFetching(false)
      setRefreshCounter(refreshCounter + 1)

      if (!result.ok) {
        throw new Error(
          `Failed to delete lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }
      return true
    },
  }
}
