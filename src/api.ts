import { apiKeyAtom, serverAtom } from "./atoms";
import { atom, useAtom, useAtomValue } from "jotai";

interface Api {
  getBalance: () => Promise<number>;
  getRecords: () => Promise<JSON>;
  getInvoice: (amount: number) => Promise<string>;
  scanLnurl: (lnurl: string) => Promise<scanLnurlApiResponse>;
  requestPayment: (scanCallback: string, invoice: string) => Promise<boolean>;
  createLnurl: (amount: number) => Promise<string>;
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
  fixed: boolean;
}

interface createLnurlApiResponse {
  id: string;
  wallet: string;
  title: string;
  min_withdrawable: number;
  max_withdrawable: number;
  uses: number;
  wait_time: number;
  is_unique: boolean;
  unique_hash: string;
  k1: string;
  open_time: number;
  used: number;
  usescsv: number;
  number: number;
  webhook_url: string;
  webhook_headers: string;
  webhook_body: string;
  custom_url: string;
  lnurl: string;
}

export function useApiCalls(): Api {
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

      const result: Response = await fetch(
        server + "api/v1/lnurlscan/" + lnurl,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "X-Api-Key": apiKey,
          },
        }
      );

      if (!result.ok) {
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        );
      }

      const json: scanLnurlApiResponse = await result.json();

      return json;
    },
    requestPayment: async (
      scanCallback: string,
      invoice: string
    ): ReturnType<Api["requestPayment"]> => {
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const result: Response = await fetch(`${scanCallback}&pr=${invoice}`);

      if (!result.ok) {
        throw new Error(
          `Failed to scan lnurl. Status: ${result.status} - ${result.statusText}`
        );
      }

      return true;
    },
    createLnurl: async (amount: number): ReturnType<Api["createLnurl"]> => {
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const result: Response = await fetch(server + "withdraw/api/v1/links", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          title: "Lotes",
          min_withdrawable: amount,
          max_withdrawable: amount,
          uses: 1,
          wait_time: 1,
          is_unique: true,
        }),
      });

      if (!result.ok) {
        throw new Error(
          `Failed to create lnurl. Status: ${result.status} - ${result.statusText}`
        );
      }

      const json: createLnurlApiResponse = await result.json();

      return json.lnurl;
    },
    getRecords: async (): ReturnType<Api["getRecords"]> => {
      if (!apiKey) {
        throw new Error("API key not found");
      }
      const result: Response = await fetch(server + "withdraw/api/v1/links", {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!result.ok) {
        throw new Error(
          `Failed to create lnurl. Status: ${result.status} - ${result.statusText}`
        );
      }

      const json: JSON = await result.json();
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
