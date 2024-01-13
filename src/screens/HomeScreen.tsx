import {Feather} from '@expo/vector-icons'
import {useAtom, useAtomValue} from 'jotai'
import React, {useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useApiCalls} from '../api'
import {RecordsList} from '../components/Lotes'
import {
  allLotesValueAtom,
  balanceAtom,
  filteredRecordsAtom,
  isFetchingAtom,
  recordsAtom,
  refreshCounterAtom,
} from '../state/atoms'
import {styles} from '../theme'
import IsLoteInternal from '../utils/isLoteInternal'
import {readNfc} from '../utils/nfc'

function Home({navigation}: {navigation: any}): JSX.Element {
  const isFetching = useAtomValue(isFetchingAtom)
  const [refreshCounter, setRefreshCounter] = useAtom(refreshCounterAtom)
  const [balance, setBalance] = useAtom(balanceAtom)
  const [records, setRecords] = useAtom(recordsAtom)
  const filteredRecords = useAtomValue(filteredRecordsAtom)
  const allLotesValue = useAtomValue(allLotesValueAtom)

  const {getInvoice, scanLnurl, requestPayment, getBalance, getRecords} =
    useApiCalls()

  const returnAvailableBalance = (): JSX.Element => {
    if (balance >= allLotesValue) {
      return (
        <View>
          <Text>
            {Math.floor(balance - allLotesValue).toLocaleString()} sats
            available
          </Text>
        </View>
      )
    }
    return (
      <View>
        <Text style={styles.redText}>
          Your lotes aren&apos;t covered.. ({allLotesValue - balance} sats
          missing)
        </Text>
      </View>
    )
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setBalance(await getBalance())
      setRecords(await getRecords())
    }

    const intervalId = setInterval(() => {
      fetchData().catch((error) => {
        console.error(error)
      })
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [getBalance, getRecords, setBalance, setRecords, refreshCounter])

  const handleClaimButtonPress = (): void => {
    void (async () => {
      try {
        const lnurlFromNfc = await readNfc()
        const scanResultJson = await scanLnurl(lnurlFromNfc)
        const temporaryAmount = scanResultJson.maxWithdrawable / 1000
        const createdInvoice = await getInvoice(temporaryAmount)
        await requestPayment(scanResultJson.callback, createdInvoice)
        setRefreshCounter(refreshCounter + 1)
      } catch (error) {
        console.error(error)
      }
    })()
  }

  const handleScannedLotePress = (): void => {
    void (async () => {
      const lnurlFromNfc = await readNfc()
      console.log('lnurlFromNfc: ', lnurlFromNfc)
      const internalLote = IsLoteInternal(lnurlFromNfc, records)
      if (internalLote) {
        navigation.navigate('LoteDetail', {
          record: records.records.find(
            (record) => record.lnurl === lnurlFromNfc
          ),
        })
      } else {
        const scannedData = await scanLnurl(lnurlFromNfc)
        navigation.navigate('ScannedLote', {record: scannedData})
      }
    })()
  }

  return (
    <View style={styles.container}>
      <Feather
        onPress={() => navigation.navigate('Settings')}
        style={styles.right}
        name="settings"
        size={26}
        color="black"
      />

      <Text style={styles.header}>
        {' '}
        {Math.floor(balance).toLocaleString()}{' '}
      </Text>
      <Text style={styles.subHeader}>sats</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Issue')}
        >
          <Text style={styles.buttonText}>✍️ Issue Lote</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpace}></View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClaimButtonPress}
          disabled={isFetching}
        >
          <Text style={styles.buttonText}>🫳 Claim Lote</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sectionHeader}>Your Lotes:</Text>
        <RecordsList
          data={{records: filteredRecords}}
          navigation={navigation}
        />
      </View>
      <Text>{'\n'} </Text>
      {returnAvailableBalance()}
      <TouchableOpacity onPress={handleScannedLotePress} disabled={isFetching}>
        <Text style={styles.link}>💡 Open Scanned Lote</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
