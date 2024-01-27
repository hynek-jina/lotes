import React from 'react'
import {Text, View} from 'react-native'

import {styles} from '../theme'

function ScannedLote({route, navigation}: any): JSX.Element {
  const {id} = route.params

  // const isUsed = record.uses - record.used <= 0

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lote ID: {id}</Text>
      {/* <Text style={styles.sectionHeader}>
        {isUsed ? 'Lote contains promise of:' : 'Lote was already used'}
      </Text>
      <Text style={styles.header}>{record.max_withdrawable}</Text>
      <Text style={styles.subHeader}>sats</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClaimButtonPress}
          disabled={isFetching}
        >
          <Text style={styles.buttonText}>🫳 Claim Lote</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secondaryText}>{record.lnurl}</Text> */}
    </View>
  )
}

export default ScannedLote
