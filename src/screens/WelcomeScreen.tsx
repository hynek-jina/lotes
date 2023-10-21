import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from '../theme'

import {useSetAtom} from 'jotai'
import {createUser} from '../api'
import {lnbitsUrlAtom} from '../state/atoms'
import constructLnbitsUrl from '../utils/constructLnbitsUrl'

function Welcome({navigation}: {navigation: any}): JSX.Element {
  const setLnbitsUrl = useSetAtom(lnbitsUrlAtom)

  const handleNewUserButton = async (): Promise<void> => {
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
