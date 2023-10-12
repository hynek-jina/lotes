import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

function Welcome({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.subHeader}>What is Lotes... actually..</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>👋 New User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>🥷 I have my LNbits</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Welcome;
