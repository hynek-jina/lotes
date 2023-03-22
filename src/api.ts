import { apiKeyAtom, serverAtom } from "./atoms";
import { atom, useAtom, useAtomValue } from "jotai";

// const [apiKey, setApiKey] = useAtom(apiKeyAtom);
// const apiKey = useAtomValue(apiKeyAtom);
// const [server, setServer] = useAtom(serverAtom);

// export const createLNURL = async (amount) => {
//   const result = await fetch(serverDomain + "withdraw/api/v1/links", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       "X-Api-Key": apiKey,
//     },
//     body: JSON.stringify({
//       title: "Lotes",
//       min_withdrawable: amount,
//       max_withdrawable: amount,
//       uses: 1,
//       wait_time: 1,
//       is_unique: true,
//     }),
//   });
//   const json = await result.json();
//   return json.lnurl;
// };

// export const paymentRequest = async (scanCallback, invoice) => {
//   const result = await fetch(`${scanCallback}&pr=${invoice}`);
//   const json = await result.json();
//   return json.status;
// };

interface Api {
  getBalance: () => Promise<number>;
  getInvoice: (amount: number) => Promise<string>;
  scanLnurl: (lnurl: string) => Promise<scanLnurlApiResponse>
}

interface getBalanceApiResponse {
  id: string;
  name: string;
  balance: number;
}

interface getInvoiceApiResponse {
  payment_hash: string;
  payment_request: string;
  checking_id: string;
  lnurl_response: string;
}


interface scanLnurlApiResponse {
  domain: string;
	tag: string;
	callback: string;
	k1: string;
	minWithdrawable: number;
	maxWithdrawable: number;
	defaultDescription: string;
	kind: string;
	fixed: boolean
}

export function useGetBalance(): Api {
  const apiKey = useAtomValue(apiKeyAtom);
  const server = useAtomValue(serverAtom);

  return {
    getBalance: async (): ReturnType<Api["getBalance"]> => {
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const result: Response = await fetch(server + "api/v1/wallet", {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!result.ok) {
        throw new Error(
          `Failed to fetch wallet balance. Status: ${result.status} - ${result.statusText}`
        );
      }

      const json: getBalanceApiResponse = await result.json();

      return json.balance / 1000;
    },
    getInvoice: async (amount: number): ReturnType<Api["getInvoice"]> => {
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const result: Response = await fetch(server + "api/v1/payments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({ out: false, amount: amount, memo: "Lotes" }),
      });

      if (!result.ok) {
        throw new Error(
          `Failed to generate an invoice. Status: ${result.status} - ${result.statusText}`
        );
      }

      const json: getInvoiceApiResponse = await result.json();

      return json.payment_request;
    },
    scanLnurl: async (lnurl: string): ReturnType<Api["scanLnurl"]> => {
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const result: Response = await fetch(server + "api/v1/lnurlscan/" + lnurl, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-Api-Key": apiKey,
        }
      });

      if (!result.ok) {
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        );
      }

      const json: scanLnurlApiResponse = await result.json();

      return json
    }
  };
}

// export const getRecords = async (key) => {
//   const result = await fetch(serverDomain + "withdraw/api/v1/links", {
//     method: "GET",
//     headers: {
//       "X-Api-Key": key,
//     },
//   });
//   const json = await result.json();
//   console.log("records: ", json);
//   return json;
// };

// export const deleteRecord = async (loteId) => {
//   const result = await fetch(serverDomain + "withdraw/api/v1/links/" + loteId, {
//     method: "DELETE",
//     headers: {
//       "X-Api-Key": apiKey,
//     },
//   });
// };
