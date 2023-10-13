import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Linking,
} from "react-native";
import { styles } from "../styles";
import { useAtom } from "jotai";
import { adminKeyAtom, lnbitsUrlAtom } from "../atoms";
import fetchAdminKey from "../utils/fetchAdminKey";

const Login = ({ navigation }: { navigation: any }): JSX.Element => {
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom);
  const [key, setKey] = useAtom(adminKeyAtom);

  const handleOpenWallet = () => {
    if (lnbitsUrl) Linking.openURL(lnbitsUrl);
  };

  const handleButtonClick = async () => {
    if (!lnbitsUrl) return;
    try {
      await fetchAdminKey(lnbitsUrl);
      navigation.navigate("Home");
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
};

export default Login;
