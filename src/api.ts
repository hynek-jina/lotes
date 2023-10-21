import {useAtomValue} from 'jotai'
import urlJoin from 'url-join'
import {adminKeyAtom, userInfoAtom} from './state/atoms'

interface Api {
  getBalance: () => Promise<number>
  getRecords: () => Promise<RecordsApi>
  getInvoice: (amount: number) => Promise<string>
  scanLnurl: (lnurl: string) => Promise<scanLnurlApiResponse>
  requestPayment: (scanCallback: string, invoice: string) => Promise<boolean>
  createLnurl: (amount: number) => Promise<string>
}

interface CreateUser {
  id: string
  name: string
  admin: string
  email: string
  password: string
  extra: {
    additionalProp1: string
    additionalProp2: string
    additionalProp3: string
  }
  wallets: [
    {
      id: string
      admin: string
      name: string
      user: string
      adminkey: string
      inkey: string
    }
  ]
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

interface scanLnurlApiResponse {
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
    const result: Response = await fetch(
      urlJoin('https://lnbits.cz', 'usermanager/api/v1/users'),
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          admin_id: '',
          user_name: 'User name',
          wallet_name: 'Wallet name',
        }),
      }
    )
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
  const apiKey = useAtomValue(adminKeyAtom)
  const userInfo = useAtomValue(userInfoAtom)
  const domain = userInfo?.domain ?? ''

  return {
    getBalance: async (): ReturnType<Api['getBalance']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      const result: Response = await fetch(urlJoin(domain, '/api/v1/wallet'), {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      })

      if (!result.ok) {
        throw new Error(
          `Failed to fetch wallet balance. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: getBalanceApiResponse = await result.json()

      return json.balance / 1000
    },
    getInvoice: async (amount: number): ReturnType<Api['getInvoice']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

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
        throw new Error(
          `Failed to generate an invoice. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: getInvoiceApiResponse = await result.json()

      return json.payment_request
    },
    scanLnurl: async (lnurl: string): ReturnType<Api['scanLnurl']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      const result: Response = await fetch(
        urlJoin(domain, '/api/v1/lnurlscan/', lnurl),
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': apiKey,
          },
        }
      )

      if (!result.ok) {
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: scanLnurlApiResponse = await result.json()

      return json
    },
    requestPayment: async (
      scanCallback: string,
      invoice: string
    ): ReturnType<Api['requestPayment']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

      const result: Response = await fetch(`${scanCallback}&pr=${invoice}`)

      if (!result.ok) {
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      return true
    },
    createLnurl: async (amount: number): ReturnType<Api['createLnurl']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }

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
        throw new Error(
          `Failed to create lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: RecordApi = await result.json()

      return json.lnurl
    },
    getRecords: async (): ReturnType<Api['getRecords']> => {
      if (!apiKey) {
        throw new Error('API key not found')
      }
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
        throw new Error(
          `Failed to create lnurl. Status: ${result.status} - ${result.statusText}`
        )
      }

      const json: RecordApi[] = await result.json()
      return {records: json}
    },
  }
}
