import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useApiCalls } from '../api'
import { styles } from '../theme'
import { writeNdef } from '../utils/nfc'

function LoteDetail({route, navigation}: any): JSX.Element {
  const {record} = route.params
  const {deleteLnurl} = useApiCalls()

  const handleWriteButtonPress = (): void => {
    void (async () => {
      try {
        void writeNdef(
          record.lnurl,
          `Store ${
            record.title
          } ${record.max_withdrawable.toLocaleString()} sats`
        )

        navigation.navigate('Home')
      } catch (error) {
        console.error(error)
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
    try {
      await deleteLnurl(record.id)
      navigation.navigate('Home')
    } catch (error) {
      console.error(error)
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
          >
            <Text style={styles.buttonText}>🗑️ Really delete</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.secondaryText}>{record.lnurl}</Text>
    </View>
  )
}

export default LoteDetail
