import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Linking from 'expo-linking'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Platform, Text } from 'react-native'
import NfcManager from 'react-native-nfc-manager'
import { Callout } from './components/Callout'
import { NfcModal } from './components/ScanNfcModal'
import Home from './screens/HomeScreen'
import Issue from './screens/IssueScreen'
import Login from './screens/LoginScreen'
import LoteDetail from './screens/LoteDetailScreen'
import ScannedLote from './screens/ScannedLoteScreen'
import Welcome from './screens/WelcomeScreen'
import { nfcModalMessageAtom } from './state/atoms'

const prefix = Linking.createURL('/')
const Stack = createNativeStackNavigator()

export default function App(): JSX.Element {
  const [hasNfc, setHasNfc] = useState(false)
  const modalMessage = useAtomValue(nfcModalMessageAtom)

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Welcome: 'Welcome',
        Home: 'Home',
        Settings: 'Settings',
      },
    },
  }

  const checkNfcAvailability = async (): Promise<void> => {
    const supported = await NfcManager.isSupported()
    setHasNfc(supported)
  }
  useEffect(() => {
    void checkNfcAvailability()
  }, [])

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Settings" component={Login} />
        <Stack.Screen
          name="Issue"
          options={{title: 'Issue New Lote'}}
          component={Issue}
        />
        <Stack.Screen
          name="LoteDetail"
          options={{title: 'Lote detail'}}
          component={LoteDetail}
        />
        <Stack.Screen
          name="ScannedLote"
          options={{title: 'Scanned Lote'}}
          component={ScannedLote}
        />
      </Stack.Navigator>

      {Platform.OS === 'android' ? <NfcModal modalCopy={modalMessage} /> : null}
      {!hasNfc ? <Callout icon="x-octagon" copy="No NFC available" /> : null}
    </NavigationContainer>
  )
}
