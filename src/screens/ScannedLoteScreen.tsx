import {useAtom, useAtomValue} from 'jotai'
import React, {useEffect, useRef, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import type {scanLnurlApiResponse} from '../api'
import {useApiCalls} from '../api'
import {
  isFetchingAtom,
  recordsAtom,
  refreshCounterAtom,
  adminKeyAtom,
} from '../state/atoms'

import {styles} from '../theme'

function ScannedLote({route, navigation}: any): JSX.Element {
  const {id} = route.params
  const records = useAtomValue(recordsAtom)
  const [refreshCounter, setRefreshCounter] = useAtom(refreshCounterAtom)
  const adminKey = useAtomValue(adminKeyAtom)
  const isFetching = useAtomValue(isFetchingAtom)
  const [selectedRecord, setSelectedRecord] =
    useState<scanLnurlApiResponse | null>(null)
  const {scanLnurl, requestPayment, getInvoice} = useApiCalls()

  const navigationRef = useRef(navigation)
  const scanLnurlRef = useRef(scanLnurl)

  useEffect(() => {
    const checkScannedLote = async (): Promise<void> => {
      const isLoteInternal = records.records.some(
        (record) => record.lnurl === id
      )
      if (isLoteInternal) {
        const record = records.records.find((record) => record.lnurl === id)
        navigationRef.current.navigate('LoteDetail', {record})
      } else {
        const scanResultJson = await scanLnurlRef.current(id)
        setSelectedRecord(scanResultJson)
      }
    }
    checkScannedLote().catch((error) => {
      console.error(error)
    })
  }, [id, records])

  const handleClaimButtonPress = (): void => {
    void (async () => {
      if (selectedRecord === null) {
        return
      }
      try {
        const temporaryAmount = selectedRecord.maxWithdrawable / 1000
        const createdInvoice = await getInvoice(temporaryAmount)
        await requestPayment(selectedRecord.callback, createdInvoice)
        setRefreshCounter(refreshCounter + 1)
        navigation.navigate('Home')
      } catch (error) {
        console.error(error)
      }
    })()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Lote contains promise of:</Text>
      <Text style={styles.header}>
        {selectedRecord === null
          ? 'loading'
          : selectedRecord.maxWithdrawable / 1000}
      </Text>
      <Text style={styles.subHeader}>sats</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClaimButtonPress}
          disabled={isFetching || selectedRecord === null || !adminKey}
        >
          <Text style={styles.buttonText}>🫳 Claim Lote</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            adminKey
              ? navigation.navigate('Home')
              : navigation.navigate('Welcome')
          }}
        >
          <Text style={styles.buttonText}>🤜 Cancel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secondaryText}>{id}</Text>
    </View>
  )
}

export default ScannedLote
