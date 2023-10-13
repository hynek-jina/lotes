import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

import { createUser } from "../api";
import constructLnbitsUrl from "../utils/constructLnbitsUrl";

function Welcome({ navigation }: { navigation: any }) {
  const handleNewUserButton = async () => {
    try {
      const newUser = await createUser();
      console.log("NEW USER response: ", newUser);
      const newLnbitsUrl = constructLnbitsUrl(
        "https://lnbits.cz",
        newUser.id,
        newUser.wallets[0].id
      );
      console.log("LNbits URL: ", newLnbitsUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.subHeader}>What is Lotes... actually..</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNewUserButton()}
        >
          <Text style={styles.buttonText}>👋 New User</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>🥷 I have my LNbits</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
