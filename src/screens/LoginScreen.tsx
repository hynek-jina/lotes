import {useAtom, useAtomValue} from 'jotai'
import {
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import appConfig from '../../app.config'
import {adminKeyAtom, isFetchingAtom, lnbitsUrlAtom} from '../state/atoms'
import {styles} from '../theme'
import fetchAdminKey from '../utils/fetchAdminKey'

const Login = ({navigation}: {navigation: any}): JSX.Element => {
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom)
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)
  const apiKey = useAtomValue(adminKeyAtom)

  const handleOpenWallet = (): void => {
    if (lnbitsUrl) void Linking.openURL(lnbitsUrl)
  }

  const buildNumber =
    Platform.OS === 'ios'
      ? appConfig.expo.ios.buildNumber
      : appConfig.expo.android.versionCode

  const appVersion = `${appConfig.expo.version} (${buildNumber})`

  const handleButtonClick = (): void => {
    setIsFetching(true)
    void (async () => {
      if (!lnbitsUrl) return
      try {
        await fetchAdminKey(lnbitsUrl)
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleButtonClick}
            disabled={isFetching}
          >
            <Text style={styles.buttonText}>💾 Save settings</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.secondaryText, {textAlign: 'center'}]}>
          App version: {appVersion}
        </Text>
        <Text style={[styles.secondaryText, {textAlign: 'center'}]}>
          Api key: {apiKey}
        </Text>
      </SafeAreaView>
    </View>
  )
}

export default Login
