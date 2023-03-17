import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
} from "react-native";
import { styles } from "../../components/styles";
// import { setApiKey, getApiKey } from "../components/ApiKey";
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { apiKeyAtom } from "../atoms";

function Login(): JSX.Element {
  const [temporaryApiKey, setTemporaryApiKey] = useState("");
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);

  const handleButtonClick = () => {
    setApiKey(temporaryApiKey);
  };

  return (
    <View style={styles.container}>
      <Text>Your LNbits apikey:</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setTemporaryApiKey}
          placeholder={temporaryApiKey}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonClick()}
        >
          <Text style={styles.buttonText}>Save settings</Text>
        </TouchableOpacity>

        <Text>Tohle máš uložený v atomu se jménem apiKeyAtom: {apiKey}</Text>
      </SafeAreaView>
    </View>
  );
}

export default Login;
