import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/LoginScreen";
import Issue from "./src/screens/IssueScreen";
import { useAtomValue } from "jotai";
import { lnbitsUrlAtom } from "./src/atoms";
import Welcome from "./src/screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const lnbitsUrl = useAtomValue(lnbitsUrlAtom);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {!lnbitsUrl ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Welcome"
            component={Welcome}
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
