import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Linking,
} from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import {
  lnbitsUrlAtom,
  domainAtom,
  userAtom,
  walletAtom,
  adminKeyAtom,
} from "../atoms";
import URLParse from "url-parse";
import axios from "axios";

function Login(): JSX.Element {
  // Preparation for parsing the server url
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom);
  const [domain, setDomain] = useAtom(domainAtom);
  const [user, setUser] = useAtom(userAtom);
  const [wallet, setWallet] = useAtom(walletAtom);
  const [adminKey, setAdminKey] = useAtom(adminKeyAtom);

  useEffect(() => {
    const parsedData = parseUrl(lnbitsUrl);

    setDomain(parsedData.domain || "");
    setUser(parsedData.user || "");
    setWallet(parsedData.wallet || "");
  }, [lnbitsUrl]);

  function parseUrl(url: string) {
    const fullUrl = new URLParse(url, true);

    const domain = fullUrl.origin;
    const user = fullUrl.query.usr;
    const wallet = fullUrl.query.wal;

    return { domain, user, wallet };
  }

  async function fetchAdminKey(lnbitsUrl: string) {
    const response = await axios.get(lnbitsUrl);
    const parsedApiKey = response.data.match(
      /<strong>Admin key: <\/strong><em>([\da-fA-F]{32})<\/em><br \/>/
    )[1];

    setAdminKey(parsedApiKey);
  }

  const handleOpenWallet = () => {
    Linking.openURL(lnbitsUrl);
  };

  const handleButtonClick = async () => {
    try {
      await fetchAdminKey(lnbitsUrl);

      const parsedData = parseUrl(lnbitsUrl);

      setDomain(parsedData.domain || "");
      setUser(parsedData.user || "");
      setWallet(parsedData.wallet || "");
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
          placeholder={lnbitsUrl}
        />

        <TouchableOpacity onPress={handleOpenWallet}>
          <Text style={styles.link}>Open wallet</Text>
        </TouchableOpacity>

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
