import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
} from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { loteAmountAtom } from "../atoms";
import { useApiCalls, RecordsApi } from "../api";
import { writeNdef } from "../nfc";
import { useNavigation } from "@react-navigation/native";

function Issue(): JSX.Element {
  const [temporaryLoteAmount, setTemporaryLoteAmount] = useAtom(loteAmountAtom);
  const navigation = useNavigation();

  const { createLnurl } = useApiCalls();

  const handleButtonClick = async () => {
    const createdLnurl = await createLnurl(temporaryLoteAmount);
    setTimeout(async () => {
      await writeNdef(
        createdLnurl,
        `Store ${temporaryLoteAmount.toLocaleString()} sats`
      );
      navigation.goBack();
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Set amount for your new Lote</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            const parsedNumber = Number(text)
            if(isNaN(parsedNumber)) return

            setTemporaryLoteAmount(parsedNumber)
          }}
          value={String(temporaryLoteAmount)}
          autoFocus
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleButtonClick}
          >
            <Text style={styles.buttonText}>✍️ Issue Lote</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Issue;
