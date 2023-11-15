import {useAtomValue} from 'jotai'
import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {userInfoAtom} from '../state/atoms'
import {readNfc} from '../utils/nfc'
import {useApiCalls, type RecordsApi} from '../api'
import {RecordsList} from '../components/Lotes'
import {Feather} from '@expo/vector-icons'
import {styles} from '../theme'

function Home({navigation}: {navigation: any}): JSX.Element {
  const userInfo = useAtomValue(userInfoAtom)
  const [balance, setBalance] = useState(0)
  const [refreshCounter, setRefreshCounter] = useState(0)

  const domain = userInfo?.domain ?? ''

  const {getBalance, getInvoice, scanLnurl, requestPayment, getRecords} =
    useApiCalls()

  const [records, setRecords] = useState<RecordsApi>({records: []})
  const [allLotesValue, setAllLotesValue] = useState(0)

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setBalance(await getBalance())
      const data = await getRecords()
      setRecords(data)
      const filteredRecords = data.records.filter(
        (record) => record.uses - record.used >= 1
      )
      const totalAmount = filteredRecords.reduce(
        (sum, record) => sum + record.max_withdrawable,
        0
      )
      setAllLotesValue(totalAmount)
    }

    const intervalId = setInterval(() => {
      void fetchData()
    }, 60_000)
    void fetchData()

    return () => {
      clearInterval(intervalId)
    }
  }, [domain, getBalance, getRecords, refreshCounter])

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

  const handleRefreshButtonPress = (): void => {
    void (async () => {
      setBalance(await getBalance())
      const data = await getRecords()
      setRecords(data)
      const filteredRecords = data.records.filter(
        (record) => record.uses - record.used >= 1
      )
      const totalAmount = filteredRecords.reduce(
        (sum, record) => sum + record.max_withdrawable,
        0
      )
      setAllLotesValue(totalAmount)
    })()
  }

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

  return (
    <View style={styles.container}>
      <Feather
        onPress={() => navigation.navigate('Settings')}
        style={styles.right}
        name="settings"
        size={26}
        color="black"
      />

      <Feather
        onPress={handleRefreshButtonPress}
        style={styles.left}
        name="refresh-ccw"
        size={26}
        color="white"
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
        >
          <Text style={styles.buttonText}>🫳 Claim Lote</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.sectionHeader}>Your Lotes</Text>
        <RecordsList data={records} navigation={navigation} />
      </View>
      <Text>{'\n'} </Text>
      {returnAvailableBalance()}
    </View>
  )
}

export default Home
