import {Text} from 'react-native'
import {RecordApi, RecordsApi} from '../api'

function Record({record}: {record: RecordApi}): JSX.Element {
  const recordAvailable = record.uses - record.used >= 1
  return (
    <Text style={{color: recordAvailable ? 'black' : 'grey', lineHeight: 20}}>
      <Text style={{fontWeight: 'bold'}}>{record.max_withdrawable}</Text>
      <Text> sats - </Text>
      <Text style={{fontWeight: '600'}}>
        {record.lnurl.substring(0, 5)}...{record.lnurl.slice(-5)}
      </Text>
      {'\n'}
    </Text>
  )
}

export function RecordsList({data}: {data: RecordsApi}): JSX.Element {
  return (
    <Text>
      {data.records.map((record) => (
        <Record key={record.id} record={record} />
      ))}
    </Text>
  )
}
