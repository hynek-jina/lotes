import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/LoginScreen";
import Home from "./src/screens/HomeScreen";
import Issue from "./src/screens/IssueScreen";
import { useAtomValue } from "jotai";
import { lnbitsUrlAtom } from "./src/atoms";

const Stack = createNativeStackNavigator();

export default function App() {
  const lnbitsUrl = useAtomValue(lnbitsUrlAtom);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!lnbitsUrl ? (
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
