import { apiKeyAtom, serverAtom } from "./atoms";
import { atom, useAtom } from "jotai";

const [apiKey, setApiKey] = useAtom(apiKeyAtom);
// const apiKey = useAtom(apiKeyAtom)[0]; Tohle je možná lepší -> check with Dejv
const [server, setServer] = useAtom(serverAtom);

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

// export const scanLNURL = async (LNURL) => {
//   try {
//     const result = await fetch(serverDomain + "api/v1/lnurlscan/" + LNURL, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         "X-Api-Key": apiKey,
//       },
//     });
//     const json = await result.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error("Error scanning LNURL:", error);
//     throw error;
//   }
// };

// export const getInvoice = async (amount) => {
//   const result = await fetch(serverDomain + "api/v1/payments", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       "X-Api-Key": apiKey,
//     },
//     body: JSON.stringify({ out: false, amount: amount, memo: "Lotes" }),
//   });

//   const json = await result.json();
//   return json.payment_request;
// };

// export const paymentRequest = async (scanCallback, invoice) => {
//   const result = await fetch(`${scanCallback}&pr=${invoice}`);
//   const json = await result.json();
//   return json.status;
// };

interface getBalanceApiResponse {
  id: string;
  name: string;
  balance: number;
}

export const getBalance = async (): Promise<number> => {
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
};

// export const getBalance = async () => {
//   console.log("Koukám na balance s klíčem: ", apiKey);
//   const result = await fetch(server + "api/v1/wallet", {
//     method: "GET",
//     headers: {
//       "X-Api-Key": apiKey,
//     },
//   });
//   const json = await result.json();
//   return json.balance / 1000;
// };

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
