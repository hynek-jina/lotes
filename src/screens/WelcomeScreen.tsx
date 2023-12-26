import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from '../theme'

import {useSetAtom, useAtom} from 'jotai'
import {createUser} from '../api'
import {lnbitsUrlAtom, isFetchingAtom, lastFetchedAtom} from '../state/atoms'
import constructLnbitsUrl from '../utils/constructLnbitsUrl'

function Welcome({navigation}: {navigation: any}): JSX.Element {
  const setLnbitsUrl = useSetAtom(lnbitsUrlAtom)
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)
  const setLastFetched = useSetAtom(lastFetchedAtom)

  const handleNewUserButton = async (): Promise<void> => {
    setIsFetching(true)
    setLastFetched("handleNewUserButton")
    try {
      const newUser = await createUser()
      console.log('NEW USER response: ', newUser)
      const newLnbitsUrl = constructLnbitsUrl(
        'https://lnbits.cz',
        newUser.id,
        newUser.wallets[0].id
      )
      console.log('LNbits URL: ', newLnbitsUrl)
      setLnbitsUrl(newLnbitsUrl)
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.subHeader}>What is Lotes... actually..</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            void handleNewUserButton()
          }}
          disabled={isFetching}
        >
          <Text style={styles.buttonText}>
            {isFetching ? '👋 Creating New User ...' : '👋 New User'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>🥷 I have my LNbits</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome
