const apiKey = "91e1464689ba490abb38fa77e2db6239";
const serverDomain = "https://legend.lnbits.com/";

export const createLNURL = async () =>  {
  //Bob
  const result = await fetch("https://legend.lnbits.com/withdraw/api/v1/links", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-Api-Key": "43d476646c4d407b94cdf6ca80c09e5a",
    },
    body: JSON.stringify({"title": "Lotes", "min_withdrawable": 1, "max_withdrawable": 2, "uses": 1, "wait_time": 1, "is_unique": true}),
  })
  const json = await result.json();
  return json.lnurl;
}

export const scanLNURL = async (LNURL) => {
  try {
    const result = await fetch(serverDomain + "api/v1/lnurlscan/" + LNURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Api-Key": apiKey,
      },
    });
    const json = await result.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error scanning LNURL:", error);
    throw error;
  }
};

export const getInvoice = async (amount) => {
  const result = await fetch(serverDomain + "api/v1/payments", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ out: false, amount: amount, memo: "Lotes" }),
  });

  const json = await result.json();
  return json.payment_request;
};

export const paymentRequest = async (scanCallback, invoice) => {
  const result = await fetch(`${scanCallback}&pr=${invoice}`);
  const json = await result.json();
  return json.status;
};