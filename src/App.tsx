import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useAtomValue} from 'jotai'
import Home from './screens/HomeScreen'
import Issue from './screens/IssueScreen'
import Login from './screens/LoginScreen'
import LoteDetail from './screens/LoteDetailScreen'
import ScannedLote from './screens/ScannedLoteScreen'
import Welcome from './screens/WelcomeScreen'
import {lnbitsUrlAtom, nfcModalMessageAtom} from './state/atoms'
import {Platform} from 'react-native'
import {NfcModal} from './components/ScanNfcModal'
import {useEffect, useState} from 'react'
import NfcManager from 'react-native-nfc-manager'
import {Callout} from './components/Callout'

const Stack = createNativeStackNavigator()

export default function App(): JSX.Element {
  const lnbitsUrl = useAtomValue(lnbitsUrlAtom)
  const [hasNfc, setHasNfc] = useState(false)
  const modalMessage = useAtomValue(nfcModalMessageAtom)

  const checkNfcAvailability = async (): Promise<void> => {
    const supported = await NfcManager.isSupported()
    setHasNfc(supported)
  }
  useEffect(() => {
    void checkNfcAvailability()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {!lnbitsUrl ? (
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        )}

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
