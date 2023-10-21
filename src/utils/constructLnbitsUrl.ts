import urlJoin from 'url-join'

export default function constructLnbitsUrl(
  domain: string,
  user: string,
  wallet: string
): string {
  return urlJoin(domain, 'wallet?usr=' + user + '&wal=' + wallet)
}
