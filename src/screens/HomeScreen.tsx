import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { atom, useAtom } from "jotai";
import { apiKeyAtom, serverAtom } from "../atoms";

import { readNfc, writeNdef } from "../nfc";

import { RecordsList } from "../components/Lotes";
import { useApiCalls, RecordsApi } from "../api";

import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";

function Home({ navigation }: { navigation: any }) {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [server, setServer] = useAtom(serverAtom);
  const [balance, setBalance] = useState(0);

  const {
    getBalance,
    getInvoice,
    scanLnurl,
    requestPayment,
    createLnurl,
    getRecords,
  } = useApiCalls();

  const [records, setRecords] = useState<RecordsApi>({ records: [] });
  const [allLotesValue, setAllLotesValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setBalance(await getBalance());
      const data = await getRecords();
      setRecords(data);
      const filteredRecords = data.records.filter(
        (record) => record.uses - record.used >= 1
      );
      const totalAmount = filteredRecords.reduce(
        (sum, record) => sum + record.max_withdrawable,
        0
      );
      setAllLotesValue(totalAmount);
    };
    const intervalId = setInterval(fetchData, 60000); // Update every 60 seconds
    fetchData();

    return () => clearInterval(intervalId);
  }, [apiKey, server]);

  const returnAvailableBalance = () => {
    if (balance >= allLotesValue) {
      return (
        <View>
          <Text>{balance - allLotesValue} sats available</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.redText}>
          Your lotes aren't covered.. ({allLotesValue - balance} sats missing)
        </Text>
      </View>
    );
  };

  const handleRefreshButtonPress = async () => {
    setBalance(await getBalance());
    const data = await getRecords();
    setRecords(data);
    const filteredRecords = data.records.filter(
      (record) => record.uses - record.used >= 1
    );
    const totalAmount = filteredRecords.reduce(
      (sum, record) => sum + record.max_withdrawable,
      0
    );
    setAllLotesValue(totalAmount);
  };

  const handleValidateButtonPress = async () => {
    try {
      const lnurlFromNfc = await readNfc();
      const scanResultJson = await scanLnurl(lnurlFromNfc);
      const createdInvoice = await getInvoice(
        scanResultJson.maxWithdrawable / 1000
      );
      const paymentReceived = await requestPayment(
        scanResultJson.callback,
        createdInvoice
      );
      const createdLnurl = await createLnurl(
        scanResultJson.maxWithdrawable / 1000
      );
      await writeNdef(createdLnurl);
    } catch (error) {
      console.error(error);
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
        color="white"
      />

      <Text style={styles.header}> {balance.toLocaleString()} </Text>
      <Text style={styles.subHeader}>sats</Text>

      {/* <Text>Api Key: {apiKey}</Text>
      <Text>Server: {server}</Text> */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleValidateButtonPress}
      >
        <Text style={styles.buttonText}>Validate 🦄</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.sectionHeader}>Your Lotes</Text>
        <RecordsList data={records} />
      </View>
      {returnAvailableBalance()}
    </View>
  );
}

export default Home;
