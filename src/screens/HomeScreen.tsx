import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { atom, useAtom } from "jotai";
import { apiKeyAtom, serverAtom } from "../atoms";

import { readNfc, writeNdef } from "../nfc";

import { RecordsList } from "../components/Lotes";
import { useApiCalls } from "../api";

import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";

function Home({ navigation }: { navigation: any }) {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [server, setServer] = useAtom(serverAtom);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const {
    getBalance,
    getInvoice,
    scanLnurl,
    requestPayment,
    createLnurl,
    getRecords,
  } = useApiCalls();

  const [records, setRecords] = useState([]);
  // const [allLotesValue, setAllLotesValue] = useState(0);

  //
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       console.log("APi key pro getRecords je: ", apiKey)
  //       const data = await getRecords(apiKey);
  //       setRecords(data);

  //       let sum = 0;
  //       data.forEach((withdrawal) => {
  //         sum += withdrawal.max_withdrawable;
  //       });
  //       setAllLotesValue(sum);
  //     };

  //     fetchData();
  //   }, [apiKey]);

  // const returtnAvailableBalance = () => {
  //   if (balance >= allLotesValue) {
  //     return (
  //       <View>
  //         <Text>{balance - allLotesValue} sats k dispozici</Text>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View>
  //       <Text style={styles.redText}>
  //         Vaše lotes nejsou dostatečně kryté.. ({balance - allLotesValue} sats k
  //         dispozici)
  //       </Text>
  //     </View>
  //   );
  // };

  const handleRefreshButtonPress = async () => {
    setBalance(await getBalance());
    const data = await getRecords();
    setRecords(data);
  };

  const handleValidateButtonPress = async () => {
    const lnurlFromNfc = await readNfc();
    const scanResultJson = await scanLnurl(lnurlFromNfc);
    const createdInvoice = await getInvoice(
      scanResultJson.maxWithdrawable / 1000
    );
    const paymentReceived = await requestPayment(
      scanResultJson.callback,
      createdInvoice
    );
    if (paymentReceived) {
      const createdLnurl = await createLnurl(
        scanResultJson.maxWithdrawable / 1000
      );
      await writeNdef(createdLnurl);
    }
  };

  return (
    <View style={styles.container}>
      <Feather
        onPress={() => navigation.navigate("Settings")}
        style={styles.right}
        name="settings"
        size={26}
        color="black"
      />

      <Feather
        onPress={handleRefreshButtonPress}
        style={styles.left}
        name="refresh-ccw"
        size={26}
        color="black"
      />

      <Text style={styles.header}> {balance.toLocaleString()} </Text>
      <Text style={styles.subHeader}>sats</Text>

      <Text>Api Key: {apiKey}</Text>
      <Text>Server: {server}</Text>
      {/* {returtnAvailableBalance()} */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleValidateButtonPress}
      >
        <Text style={styles.buttonText}>Validate 🦄</Text>
      </TouchableOpacity>
      <View>
        <Text>Your Lotes</Text>
        <RecordsList records={records} />
      </View>
    </View>
  );
}

export default Home;
