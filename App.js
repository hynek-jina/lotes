import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { readNfc, writeNdef } from "./components/nfc";
import {
  createLNURL,
  scanLNURL,
  getInvoice,
  paymentRequest,
  getBalance,
  getRecords,
} from "./components/api";
import { RecordsList } from "./components/lotes";

const App = () => {
  const [message, setMessage] = useState("Lotes");
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [records, setRecords] = useState([]);
  const [allLotesValue, setAllLotesValue] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const showBalance = await getBalance();
      setBalance(showBalance);
    };
    const timer = setInterval(fetchBalance, 10000);
    return () => clearInterval(timer);
  }, [setBalance]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecords();
      // const data = await response.json();
      setRecords(data);

      let sum = 0;
      data.forEach((withdrawal) => {
        sum += withdrawal.max_withdrawable;
      });
      setAllLotesValue(sum);
    };

    fetchData();
  }, []);

  const returtnAvailableBalance = () => {
    if (balance >= allLotesValue) {
      return (
        <View>
          <Text>{balance - allLotesValue} sats k dispozici</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.redText}>
          Vaše lotes nejsou dostatečně kryté.. ({balance - allLotesValue} sats k
          dispozici)
        </Text>
      </View>
    );
  };

  const handleButtonPress = async () => {
    try {
      //1) READ NFC
      setStatus("1");
      const readNfcMessage = await readNfc();
      setMessage(readNfcMessage); // TODO: Add LNURL validation (no spaces, starting with "LNRUL", longer then 20 characters) Nebo to handlovat následnou funkcí scanLNURL?
      console.log("tohle jsme přečetli: ", readNfcMessage);

      //2) SCAN LNURL
      setStatus("2");
      const json = await scanLNURL(readNfcMessage);
      const callback = json.callback;
      const maxWithdrawable = json.maxWithdrawable;
      const invoiceAmount = maxWithdrawable / 1000;

      //3) CREATE AN INVOICE
      setStatus("3");
      const invoice = await getInvoice(invoiceAmount);
      console.log(`Invoice generated: ${invoice}`);

      //4) REQUEST PAYMENT
      setStatus("4");
      const paymentStatus = await paymentRequest(callback, invoice);
      console.log("payment requested");

      setStatus("4.5");
      if (paymentStatus === "OK") {
        //5) CREATE LNURL
        setStatus("5");
        const newLNURL = await createLNURL(invoiceAmount);
        console.log(`LNURL created: ${newLNURL}`);
        setMessage(newLNURL);

        // //6) WRITE TO NFC
        // setStatus("6");
        // await writeNdef(newLNURL); //tohle to taky nedělá
        // setStatus("Nádhera");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {balance} </Text>
      <Text style={styles.subHeader}>sats</Text>

      <Text>NFC reader for lightning notes ⚡️</Text>
      {returtnAvailableBalance()}

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
      <Text>Status: {status}</Text>
      <View>
        <Text>Your Lotes</Text>
        <RecordsList records={records} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#008CBA",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  redText: {
    color: "#F00",
  },
  header: {
    // height: 80,
    width: "100%",
    borderBottomColor: "#333",
    color: "#000",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    height: 80,
  },
});

export default App;
