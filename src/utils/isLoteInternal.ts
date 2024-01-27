import type {RecordsApi} from '../api'

export default function IsLoteInternal(
  lnUrl: string,
  records: RecordsApi
): boolean {
  const isLoteKnown = records.records.some((record) => record.lnurl === lnUrl)

  return isLoteKnown
}
