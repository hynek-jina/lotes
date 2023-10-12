import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Linking,
} from "react-native";
import { styles } from "../styles";
import { useAtom, useSetAtom } from "jotai";
import { lnbitsUrlAtom, adminKeyAtom } from "../atoms";
import axios from "axios";

const Login = ({ navigation }: { navigation: any }): JSX.Element => {
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom);
  const setAdminKey = useSetAtom(adminKeyAtom);

  async function fetchAdminKey(lnbitsUrl: string) {
    const response = await axios.get(lnbitsUrl);
    const parsedApiKey = response.data.match(
      /<strong>Admin key: <\/strong><em>([\da-fA-F]{32})<\/em><br \/>/
    )[1];

    setAdminKey(parsedApiKey);
  }

  const handleOpenWallet = () => {
    if (lnbitsUrl) Linking.openURL(lnbitsUrl);
  };

  const handleButtonClick = async () => {
    if (!lnbitsUrl) return;
    try {
      await fetchAdminKey(lnbitsUrl);
      navigation.navigate("Home")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>LNbits URL:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLnbitsUrl}
          value={lnbitsUrl ?? ""}
        />

        {lnbitsUrl && (
          <TouchableOpacity onPress={handleOpenWallet}>
            <Text style={styles.link}>Open wallet</Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick()}
          >
            <Text style={styles.buttonText}>Save settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Login;
