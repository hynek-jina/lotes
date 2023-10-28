import React from 'react'
import {Text, View} from 'react-native'

function LoteDetail({route}: any): JSX.Element {
  const {record} = route.params

  return (
    <View>
      <Text>Detail záznamu</Text>
      <Text>Max withdrawable: {record.max_withdrawable} sats</Text>
      <Text>LNURL: {record.lnurl}</Text>
      {/* Zde můžete zobrazit další informace o záznamu */}
    </View>
  )
}

export default LoteDetail
