import { AsyncStorage } from "react-native";
import { useState, useEffect } from "react";

const dataStorage = () => {
  const [key, setKey] = useState("");
  const [server, setServer] = useState("");

  useEffect(() => {
    const getValue = async () => {
      try {
        const value = await AsyncStorage.getItem("apiKey");
        if (value !== null) {
          setKey(value);
        }
      } catch (error) {
        console.log("Error retrieving value", error);
      }
    };
    getValue();
  }, []);

  useEffect(() => {
    const getValue = async () => {
      try {
        const value = await AsyncStorage.getItem("server");
        if (value !== null) {
          setServer(value);
        }
      } catch (error) {
        console.log("Error retrieving value", error);
      }
    };
    getValue();
  }, []);
  return  { key, server }
};

export default dataStorage;
