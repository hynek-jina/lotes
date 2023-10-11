import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/LoginScreen";
import Home from "./src/screens/HomeScreen";
import Issue from "./src/screens/IssueScreen";
import { atom, useAtom, useAtomValue } from "jotai";
import { adminKeyAtom } from "./src/atoms";

const Stack = createNativeStackNavigator();

export default function App() {
  const apiKey = useAtomValue(adminKeyAtom);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!apiKey ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen name="Settings" component={Login} />
        <Stack.Screen name="Issue" options={{title:"Issue New Lote"}} component={Issue} />
        {/*<Stack.Screen name="Playground" component={PlaygroundScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
