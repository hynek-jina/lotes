import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { styles } from "../styles";

import { createUser } from "../api";
import constructLnbitsUrl from "../utils/constructLnbitsUrl";
import Carousel from "react-native-snap-carousel";

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

  interface CarouselData {
    id: number;
    name: string;
    image: any; // what should be here?
  }

  const SLIDER_WIDTH = Dimensions.get('window').width + 30;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
  
  const data: CarouselData[] = [
    {
      id: 1,
      name: 'Upload your Lightning nOTE to an NFC card',
      image: require('../assets/Carousel1.png')
    },
    {
      id: 2,
      name: 'Physically hand the card to someone',
      image: require('../assets/Carousel2.png')
    },
    {
      id: 3,
      name: 'The recipient can claim the funds anytime',
      image: require('../assets/Carousel3.png')
    },
  ];

const renderItem = ({ item }: { item: CarouselData }) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        // backgroundColor: 'white',
      }}>
      <Image source={item.image} style={{ width: 200, height: 200 }} />
      <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
        {item.name}
      </Text>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.subHeader}>What is Lotes... actually..</Text>
      <Carousel data={data} renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}></Carousel>
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
