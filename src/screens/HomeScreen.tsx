import {useAtomValue, useSetAtom} from 'jotai'
import React, {useEffect, useState} from 'react'
import {Platform, Text, TouchableOpacity, View} from 'react-native'
import {nfcModalVisibilityAtom, userInfoAtom} from '../state/atoms'

import {readNfc, writeNdef} from '../utils/nfc'

import {useApiCalls, type RecordsApi} from '../api'
import {RecordsList} from '../components/Lotes'

import {Feather} from '@expo/vector-icons'
import NfcManager from 'react-native-nfc-manager'
import {Callout} from '../components/Callout'
import {NfcModal} from '../components/ScanNfcModal'
import {styles} from '../theme'

function Home({navigation}: {navigation: any}): JSX.Element {
  const userInfo = useAtomValue(userInfoAtom)
  const [balance, setBalance] = useState(0)
  const [refreshCounter, setRefreshCounter] = useState(0)

  const setModalVisible = useSetAtom(nfcModalVisibilityAtom)

  const domain = userInfo?.domain ?? ''

  const {
    getBalance,
    getInvoice,
    scanLnurl,
    requestPayment,
    createLnurl,
    getRecords,
  } = useApiCalls()

  const [records, setRecords] = useState<RecordsApi>({records: []})
  const [allLotesValue, setAllLotesValue] = useState(0)

  const [hasNfc, setHasNfc] = useState(false)

  const checkNfcAvailability = async (): Promise<void> => {
    const supported = await NfcManager.isSupported()
    setHasNfc(supported)
  }

  useEffect(() => {
    void checkNfcAvailability()
  }, [])

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

  const handleSandboxPress = (): void => {
    setModalVisible(true)
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

  const handleValidateButtonPress = (): void => {
    void (async () => {
      try {
        const lnurlFromNfc = await readNfc()
        const scanResultJson = await scanLnurl(lnurlFromNfc)
        const temporaryAmount = scanResultJson.maxWithdrawable / 1000
        const createdInvoice = await getInvoice(temporaryAmount)
        await requestPayment(scanResultJson.callback, createdInvoice)
        const createdLnurl = await createLnurl(temporaryAmount)
        setTimeout(() => {
          void writeNdef(
            createdLnurl,
            `Store ${temporaryAmount.toLocaleString()} sats`
          )
        }, 3000)
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

      <TouchableOpacity onPress={handleValidateButtonPress}>
        <Text style={styles.buttonLink}>🦄 Validate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSandboxPress}>
        <Text style={styles.buttonLink}>Show modal</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <NfcModal modalCopy="Test modal copy" />
      ) : null}
      {!hasNfc ? <Callout icon="x-octagon" copy="No NFC available" /> : null}
    </View>
  )
}

export default Home

//TODO:smazat validate function
//TODO:smazat sandbox function
//TODO:prolinkovat NFC modal s NFC cally
