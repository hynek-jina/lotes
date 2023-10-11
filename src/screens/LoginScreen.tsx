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
  apiKeyAtom,
  serverAtom,
  lnbitsUrlAtom,
  domainAtom,
  userAtom,
  walletAtom,
} from "../atoms";
import URLParse from "url-parse";

function Login(): JSX.Element {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [temporaryApiKey, setTemporaryApiKey] = useState(apiKey);

  // Preparation for parsing the server url
  const [lnbitsUrl, setLnbitsUrl] = useAtom(lnbitsUrlAtom);
  const [domain, setDomain] = useAtom(domainAtom);
  const [user, setUser] = useAtom(userAtom);
  const [wallet, setWallet] = useAtom(walletAtom);

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

  const handleOpenWallet = () => {
    Linking.openURL(lnbitsUrl);
  }

  const defaultServer = (): string => {
    if (server) {
      return server;
    } else return "https://legend.lnbits.com/";
  };
  const [server, setServer] = useAtom(serverAtom);
  const [temporaryServer, setTemporaryServer] = useState(defaultServer);

  const handleButtonClick = () => {
    setApiKey(temporaryApiKey);
    setServer(temporaryServer);
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
        <Text>LNbits URL:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLnbitsUrl}
          placeholder={lnbitsUrl}
        />

      <TouchableOpacity onPress={handleOpenWallet}>
        <Text style={styles.link}>Open wallet</Text>
      </TouchableOpacity>
        <Text>domain: {domain}</Text>
        <Text>user: {user}</Text>
        <Text>wallet: {wallet}</Text>

      </SafeAreaView>
    </View>
  );
}

export default Login;
