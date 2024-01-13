import React, {useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from '../theme'

import {useAtom, useSetAtom} from 'jotai'
import {createUser} from '../api'
import {isFetchingAtom, lastFetchedAtom, lnbitsUrlAtom} from '../state/atoms'
import constructLnbitsUrl from '../utils/constructLnbitsUrl'

function Welcome({navigation}: {navigation: any}): JSX.Element {
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom)
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)
  const setLastFetched = useSetAtom(lastFetchedAtom)

  useEffect(() => {
    if (lnbitsUrl) {
      navigation.navigate('Home')
    }
  }, [lnbitsUrl, navigation])

  const handleNewUserButton = async (): Promise<void> => {
    setIsFetching(true)
    setLastFetched('handleNewUserButton')
    try {
      const newUser = await createUser()
      console.log('NEW USER response: ', newUser)
      const newLnbitsUrl = constructLnbitsUrl(
        'https://lnbits.cz',
        newUser.user,
        newUser.id
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
      <Text style={styles.subHeader}>Lotes is lightning cash</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            void handleNewUserButton()
          }}
          disabled={isFetching}
        >
          <Text style={styles.buttonText}>👋 New User</Text>
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
