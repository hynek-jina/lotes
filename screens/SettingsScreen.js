import { AsyncStorage, View, Text } from "react-native";
import { useState } from "react";
import { TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import { styles } from "../src/styles";
import { API_KEY, SERVER } from "../config";

function SettingsScreen({ navigation }) {
  const [apiKey, setApiKey] = useState(API_KEY);
  const [serverValue, setServerValue] = useState(SERVER);

  const handleButtonClick = () => {
    AsyncStorage.setItem("apiKey", apiKey).catch((error) =>
      console.log("Error storing value", error)
    );
    AsyncStorage.setItem("server", serverValue).catch((error) =>
      console.log("Error storing value", error)
    );
  };

  return (
    <View style={styles.container}>
      <Text>Your LNbits apikey:</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={setApiKey}
          placeholder={apiKey}
        />
        <Text>Your LNbits server:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={setServerValue}
          placeholder={serverValue}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonClick()}
        >
          <Text style={styles.buttonText}>Save settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Playground")}
        >
          <Text style={styles.buttonText}>Playground</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default SettingsScreen;
