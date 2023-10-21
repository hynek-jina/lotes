import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useAtomValue} from 'jotai'
import Home from './screens/HomeScreen'
import Issue from './screens/IssueScreen'
import Login from './screens/LoginScreen'
import Welcome from './screens/WelcomeScreen'
import {lnbitsUrlAtom} from './state/atoms'

const Stack = createNativeStackNavigator()

export default function App(): JSX.Element {
  const lnbitsUrl = useAtomValue(lnbitsUrlAtom)

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
