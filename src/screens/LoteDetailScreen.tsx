import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useAtom} from 'jotai'
import {isFetchingAtom} from '../state/atoms'
import {useApiCalls} from '../api'
import {styles} from '../theme'
import {writeNdef} from '../utils/nfc'

function LoteDetail({route, navigation}: any): JSX.Element {
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)

  const {record} = route.params
  const {deleteLnurl} = useApiCalls()

  const handleWriteButtonPress = (): void => {
    setIsFetching(true)
    void (async () => {
      try {
        void writeNdef(
          record.lnurl,
          `Store ${
            record.title
          } with ${record.max_withdrawable.toLocaleString()} sats`
        )
      } catch (error) {
        console.error(error)
      } finally {
        navigation.navigate('Home')
        setIsFetching(false)
      }
    })()
  }

  const [visibleButton, setVisibleButton] = useState('default')

  const handleDeleteButtonPress = (): void => {
    setVisibleButton('toBeDeleted')
    setTimeout(() => {
      setVisibleButton('default')
    }, 2000)
  }

  const handleDeleteConfirmButtonPress = async (): Promise<void> => {
    setIsFetching(true)
    try {
      await deleteLnurl(record.id)
      navigation.navigate('Home')
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{record.max_withdrawable}</Text>
      <Text style={styles.subHeader}>sats</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleWriteButtonPress}
          disabled={isFetching}
        >
          <Text style={styles.buttonText}>👉 Write to NFC</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {visibleButton === 'default' && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleDeleteButtonPress}
          >
            <Text style={styles.buttonText}>🗑️ Delete Lote</Text>
          </TouchableOpacity>
        )}
        {visibleButton !== 'default' && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              void handleDeleteConfirmButtonPress()
            }}
            disabled={isFetching}
          >
            <Text style={styles.buttonText}>
              {isFetching ? '🗑️ Deleting ...' : '🗑️ Really delete'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.secondaryText}>{record.lnurl}</Text>
    </View>
  )
}

export default LoteDetail
