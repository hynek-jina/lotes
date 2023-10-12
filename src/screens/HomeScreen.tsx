import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { atom, useAtom, useAtomValue } from "jotai";
import { adminKeyAtom, userInfoAtom } from "../atoms";

import { readNfc, writeNdef } from "../nfc";

import { RecordsList } from "../components/Lotes";
import { useApiCalls, RecordsApi } from "../api";

import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";

function Home({ navigation }: { navigation: any }) {
  const apiKey = useAtom(adminKeyAtom);
  const userInfo = useAtomValue(userInfoAtom);
  const [balance, setBalance] = useState(0);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const domain = userInfo?.domain ?? "";

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
  }, [domain, refreshCounter]);

  const returnAvailableBalance = () => {
    if (balance >= allLotesValue) {
      return (
        <View>
          <Text>
            {Math.floor(balance - allLotesValue).toLocaleString()} sats
            available
          </Text>
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

  const handleBurnButtornPress = async () => {
    const lnurlFromNfc = await readNfc();
    const scanResultJson = await scanLnurl(lnurlFromNfc);
  };

  const handleValidateButtonPress = async () => {
    try {
      const lnurlFromNfc = await readNfc();
      const scanResultJson = await scanLnurl(lnurlFromNfc);
      let temporaryAmount = scanResultJson.maxWithdrawable / 1000;
      const createdInvoice = await getInvoice(temporaryAmount);
      const paymentReceived = await requestPayment(
        scanResultJson.callback,
        createdInvoice
      );
      const createdLnurl = await createLnurl(temporaryAmount);
      setTimeout(async () => {
        await writeNdef(
          createdLnurl,
          `Store ${temporaryAmount.toLocaleString()} sats`
        );
      }, 3000);
      setRefreshCounter(refreshCounter + 1);
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

      <Text style={styles.header}>
        {" "}
        {Math.floor(balance).toLocaleString()}{" "}
      </Text>
      <Text style={styles.subHeader}>sats</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Issue")}
        >
          <Text style={styles.buttonText}>✍️ Issue</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpace}></View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBurnButtornPress}
        >
          <Text style={styles.buttonText}>🔥 Burn</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.sectionHeader}>Your Lotes</Text>
        <RecordsList data={records} />
      </View>
      {returnAvailableBalance()}

      <TouchableOpacity
        //style={styles.button}
        onPress={handleValidateButtonPress}
      >
        <Text style={styles.buttonLink}>🦄 Validate</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
