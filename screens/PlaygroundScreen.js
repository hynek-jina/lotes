// import { Text, View, TouchableOpacity, AsyncStorage } from "react-native";
// import React, { useState, useEffect } from "react";
// import { styles } from "../components/styles";

// function PlaygroundScreen() {
//   const [key, setKey] = useState("");
//   const [server, setServer] = useState("");

//   useEffect(() => {
//     const getValue = async () => {
//       try {
//         const value = await AsyncStorage.getItem("apiKey");
//         if (value !== null) {
//           setKey(value);
//         }
//       } catch (error) {
//         console.log("Error retrieving value", error);
//       }
//     };
//     getValue();
//   }, []);

//   useEffect(() => {
//     const getValue = async () => {
//       try {
//         const value = await AsyncStorage.getItem("server");
//         if (value !== null) {
//           setServer(value);
//         }
//       } catch (error) {
//         console.log("Error retrieving value", error);
//       }
//     };
//     getValue();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Retrieve value</Text>
//       </TouchableOpacity>
//       <Text>Key: {key}</Text>
//       <Text>Server: {server}</Text>
//     </View>
//   );
// }

// export default PlaygroundScreen;

import dataStorage from "../components/dataStorage";
import { Text, View } from "react-native";

function PlaygroundScreen() {
  const { key, server } = dataStorage();
  return (
    <View>
      <Text>key: {key}</Text>
      <Text>server: {server}</Text>
    </View>
  );
}
export default PlaygroundScreen;
