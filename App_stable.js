import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import PlaygroundScreen from './screens/PlaygroundScreen'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Playground" component={PlaygroundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
