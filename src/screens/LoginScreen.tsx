import {useAtom} from 'jotai'
import {
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {lnbitsUrlAtom} from '../state/atoms'
import {styles} from '../theme'
import fetchAdminKey from '../utils/fetchAdminKey'

const Login = ({navigation}: {navigation: any}): JSX.Element => {
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom)

  const handleOpenWallet = (): void => {
    if (lnbitsUrl) void Linking.openURL(lnbitsUrl)
  }

  const handleButtonClick = (): void => {
    void (async () => {
      if (!lnbitsUrl) return
      try {
        await fetchAdminKey(lnbitsUrl)
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>LNbits URL:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLnbitsUrl}
          value={lnbitsUrl ?? ''}
        />

        {lnbitsUrl && (
          <TouchableOpacity onPress={handleOpenWallet}>
            <Text style={styles.link}>Open wallet</Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
            <Text style={styles.buttonText}>Save settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Login
