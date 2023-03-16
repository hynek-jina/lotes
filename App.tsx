// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/LoginScreen";
import {atom, useAtom} from 'jotai'


// state/formData
type State = {
  username: string
  password: string
}

export const formDataAtom = atom<State>({username: '', password: ''})

const Stack = createNativeStackNavigator();

export default function App() {
const hasValue = false

const [formData, setFormData]= useAtom(formDataAtom)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!hasValue ? <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        /> : <Stack.Screen name="Settings" component={Login} />} {/* sem pak jebni homescreen */}
        {/* <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Playground" component={PlaygroundScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
