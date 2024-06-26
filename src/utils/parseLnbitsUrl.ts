import URLParse from 'url-parse'

export default function parseLnbitsUrl(
  lnbitsUrl: string
): {domain: string; user: string; wallet: string} | null {
  const fullUrl = new URLParse(lnbitsUrl, true)

  const domain = fullUrl.origin
  const user = fullUrl.query.usr
  const wallet = fullUrl.query.wal

  if (!domain || !user || !wallet) return null

  return {domain, user, wallet}
}
