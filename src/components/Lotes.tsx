import {Text, TouchableOpacity, View} from 'react-native'
import {type RecordApi, type RecordsApi} from '../api'

function Record({
  record,
  navigation,
}: {
  record: RecordApi
  navigation: any
}): JSX.Element {
  const handleRecordPress = (): void => {
    navigation.navigate('LoteDetail', {record})
  }

  const recordAvailable = record.uses - record.used >= 1
  return (
    <TouchableOpacity onPress={handleRecordPress}>
      <Text style={{color: recordAvailable ? 'black' : 'grey', lineHeight: 20}}>
        <Text style={{fontWeight: 'bold'}}>{record.max_withdrawable}</Text>
        <Text> sats - </Text>
        <Text style={{fontWeight: '600'}}>
          {record.lnurl.substring(0, 5)}...{record.lnurl.slice(-5)}
        </Text>
      </Text>
    </TouchableOpacity>
  )
}

export function RecordsList({
  data,
  navigation,
}: {
  data: RecordsApi
  navigation: any
}): JSX.Element {
  return (
    <View style={{flexDirection: 'column'}}>
      {data.records.map((record) => (
        <Record key={record.id} record={record} navigation={navigation} />
      ))}
    </View>
  )
}
