import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  createLNURL,
  scanLNURL,
  getInvoice,
  paymentRequest,
} from "./components/api";

const App = () => {
  const [paymentStatus, setPaymentStatus] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const getContent = () => {
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.displayedText}>Status: {paymentStatus}</Text>
      </View>
    );
  };

  const handleButtonPress = async () => {
    setIsLoading(true);

    try {
      //CREATE LNURL
      const bobLNURL = await createLNURL();
      console.log(`LNURL created: ${bobLNURL}`);

      //SCAN LNURL
      const json = await scanLNURL(bobLNURL);
      const callback = json.callback;
      const maxWithdrawable = json.maxWithdrawable;
      const invoiceAmount = maxWithdrawable / 1000;

      //CREATE AN INVOICE
      const invoice = await getInvoice(invoiceAmount);
      console.log(`Invoice generated: ${invoice}`);

      //REQUEST PAYMENT
      const paymentStatus = await paymentRequest(callback, invoice);
      console.log("payment requested");
      setPaymentStatus(paymentStatus);
    } catch (error) {
      console.error(error);
      setPaymentStatus("Error occurred while processing payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Insert LNURL and see it displayed</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Paste LNURL here"
        onChangeText={handleInputChange}
        value={inputValue}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Scan LNURL</Text>
      </TouchableOpacity>
      <Text>{getContent()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    width: "40%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  displayedText: {
    marginTop: 10,
  },
});

export default App;
