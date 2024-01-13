import {useAtom} from 'jotai'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {isFetchingAtom} from '../state/atoms'
// import {useApiCalls} from '../api'
import {styles} from '../theme'
// import {writeNdef} from '../utils/nfc'

function ScannedLote({route, navigation}: any): JSX.Element {
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)

  setIsFetching(false) // TODO: Remove this line
  const {record} = route.params

  const handleClaimButtonPress = (): void => {
    // TODO: Implement Claim part (without additional scan)
    // void (async () => {
    //   try {
    //     const lnurlFromNfc = await readNfc()
    //     const scanResultJson = await scanLnurl(lnurlFromNfc)
    //     const temporaryAmount = scanResultJson.maxWithdrawable / 1000
    //     const createdInvoice = await getInvoice(temporaryAmount)
    //     await requestPayment(scanResultJson.callback, createdInvoice)
    //     setRefreshCounter(refreshCounter + 1)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // })()
  }

  const isUsed = record.uses - record.used <= 0

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>
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

      <Text style={styles.secondaryText}>{record.lnurl}</Text>
    </View>
  )
}

export default ScannedLote
