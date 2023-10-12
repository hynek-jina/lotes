import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { createUser } from "../api";

function Welcome({ navigation }: { navigation: any }) {
  const [result, setResult] = useState("Welcome to Lotes!");

  const handleNewUserButton = async () => {
    try {
      const newUser = await createUser();
      setResult(newUser);
    } catch (error) {
      setResult("Failed to create user: ${error.message}");
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
      <Text>{result}</Text>
    </View>
  );
}

export default Welcome;
