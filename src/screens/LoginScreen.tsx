import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
} from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { apiKeyAtom, serverAtom } from "../atoms";

function Login(): JSX.Element {
  const [temporaryApiKey, setTemporaryApiKey] = useState("");
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);

  const [temporaryServer, setTemporaryServer] = useState("https://legend.lnbits.com/");
  const [server, setServer] = useAtom(serverAtom);

  const handleButtonClick = () => {
    setApiKey(temporaryApiKey);
    setServer(temporaryServer)
  };

  return (
    <View style={styles.container}>

      <SafeAreaView>
      <Text>Your LNbits apikey:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTemporaryApiKey}
          placeholder={temporaryApiKey}
          
        />
<Text>Your LNbits server:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTemporaryServer}
          placeholder={temporaryServer}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonClick()}
        >
          <Text style={styles.buttonText}>Save settings</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
}

export default Login;
