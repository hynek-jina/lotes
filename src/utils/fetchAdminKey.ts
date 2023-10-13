import axios from "axios";

export default async function fetchAdminKey(lnbitsUrl: string) {
  try {
    const response = await axios.get(lnbitsUrl);

    const parsedApiKey: string = response.data.match(
      /<strong>Admin key: <\/strong><em>([\da-fA-F]{32})<\/em><br \/>/
    )[1];

    return parsedApiKey || "";
  } catch (error) {
    console.error("Fetch admin key failed: ", error);
    return "";
  }
}
