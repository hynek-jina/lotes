import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { atom, useAtom } from "jotai";
import { apiKeyAtom, serverAtom } from "../atoms";

import { readNfc, writeNdef } from "../nfc";

// import { RecordsList } from "../components/lotes";
import { useGetBalance } from "../api";

import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";

function Home({ navigation }: { navigation: any }) {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [server, setServer] = useAtom(serverAtom);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const { getBalance, getInvoice, scanLnurl } = useGetBalance();

  const adhocLnurl: string =
    "LNURL1DP68GURN8GHJ7MR9VAJKUEPWD3HXY6T5WVHXXMMD9AMKJARGV3EXZAE0V9CXJTMKXYHKCMN4WFKZ7C2CX4P9G5ZPGDNXSU268QENGA2VX488XAM59A55WEJK2DR5XJ6G2Y6RWM2GGFJ4V4REDAG4VMF9C85";

  //   const [message, setMessage] = useState("Lotes");
  //   const [status, setStatus] = useState("");
  //   const [records, setRecords] = useState([]);
  //   const [allLotesValue, setAllLotesValue] = useState(0);
  //   const [apiKey, setApiKey] = useState(defaultApiKey);
  //   const interval = 10000;

  //   useEffect(() => {
  //     const checkApiKey = setInterval(() => {
  //       console.log("spouštím useEffect");
  //       AsyncStorage.getItem("apiKey")
  //         .then((value) => {
  //           setApiKey(value);
  //         })
  //         .catch((error) => {
  //           console.log("Chyba při načítání apiKey z AsyncStorage:", error);
  //         });
  //     }, interval);
  //     // cleanup function
  //     return () => {
  //       clearInterval(checkApiKey);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const fetchBalance = async () => {
  //       try {
  //         const showBalance = await getBalance(apiKey);
  //         setBalance(showBalance);
  //       } catch (error) {
  //         console.log("Chyba při načítání showBalance:", error);
  //       }
  //     };

  //     const intervalId = setInterval(fetchBalance, interval);

  //     return () => clearInterval(intervalId);
  //   }, [apiKey]);

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

  //   const returtnAvailableBalance = () => {
  //     if (balance >= allLotesValue) {
  //       return (
  //         <View>
  //           <Text>{balance - allLotesValue} sats k dispozici</Text>
  //         </View>
  //       );
  //     }
  //     return (
  //       <View>
  //         <Text style={styles.redText}>
  //           Vaše lotes nejsou dostatečně kryté.. ({balance - allLotesValue} sats k
  //           dispozici)
  //         </Text>
  //       </View>
  //     );
  //   };
  const handleCreateInvoiceButtonPress = async () => {
    // setInvoice(await getInvoice(10));

    // const scanResult = await scanLnurl(adhocLnurl);
    // setMessage(scanResult.callback);

    const readNfcMessage = await readNfc();
    setMessage(readNfcMessage);
  };
  //   const handleButtonPress = async () => {
  //     try {
  //       //1) READ NFC
  //       setStatus("1");
  //       const readNfcMessage = await readNfc();
  //       setMessage(readNfcMessage); // TODO: Add LNURL validation (no spaces, starting with "LNRUL", longer then 20 characters) Nebo to handlovat následnou funkcí scanLNURL?
  //       console.log("tohle jsme přečetli: ", readNfcMessage);

  //       //2) SCAN LNURL
  //       setStatus("2");
  //       const json = await scanLNURL(readNfcMessage);
  //       const callback = json.callback;
  //       const maxWithdrawable = json.maxWithdrawable;
  //       const invoiceAmount = maxWithdrawable / 1000;

  //       //3) CREATE AN INVOICE
  //       setStatus("3");
  //       const invoice = await getInvoice(invoiceAmount);
  //       console.log(`Invoice generated: ${invoice}`);

  //       //4) REQUEST PAYMENT
  //       setStatus("4");
  //       const paymentStatus = await paymentRequest(callback, invoice);
  //       console.log("payment requested");

  //       setStatus("4.5");
  //       if (paymentStatus === "OK") {
  //         //5) CREATE LNURL
  //         setStatus("5");
  //         const newLNURL = await createLNURL(invoiceAmount);
  //         console.log(`LNURL created: ${newLNURL}`);
  //         setMessage(newLNURL);

  //         // //6) WRITE TO NFC
  //         // setStatus("6");
  //         // await writeNdef(newLNURL); //tohle to taky nedělá
  //         // setStatus("Nádhera");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

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
        onPress={async () => setBalance(await getBalance())}
        style={styles.left}
        name="refresh-ccw"
        size={26}
        color="black"
      />

      <Text style={styles.header}> {balance} </Text>
      <Text style={styles.subHeader}>sats</Text>

      <Text>NFC reader for lightning notes ⚡️</Text>
      <Text>Tvůj api klíč je: {apiKey}</Text>
      <Text>Tvůj api klíč je: {server}</Text>
      {/* {returtnAvailableBalance()} */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateInvoiceButtonPress}
      >
        <Text style={styles.buttonText}>Do the Magic 🦄</Text>
      </TouchableOpacity>

      <Text>text: {message}</Text>

      {/*
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Scan NFC</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => writeNdef(message)}
      >
        <Text style={styles.buttonText}>Write to NFC</Text>
      </TouchableOpacity>

      <Text>Message: {message}</Text>
      <Text>Status: {status}</Text> */}
      {/* <View>
        <Text>Your Lotes</Text>
        <RecordsList records={records} />
      </View> */}
    </View>
  );
}

export default Home;
