import URLParse from "url-parse";

export default function parseLnbitsUrl(url: string) {
  const fullUrl = new URLParse(url, true);

  const domain = fullUrl.origin;
  const user = fullUrl.query.usr;
  const wallet = fullUrl.query.wal;

  if (!domain || !user || !wallet) return null;

  return { domain, user, wallet };
}
