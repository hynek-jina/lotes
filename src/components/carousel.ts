import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";


interface CarouselData {
  id: number;
  link: string;
  text: string;
}

const MyCarousel = () => {
  const data: CarouselData[] = [
    { id: 1, link: '../images/Carousel1.png', text: "Upload your Lightning nOTE to an NFC card"},
    { id: 2, link: '../images/Carousel2.png', text: "Physically hand the card to someone"},
    { id: 3, link: '../images/Carousel3.png', text: "The recipient can claim the funds anytime"},
  ];

  

}

export default MyCarousel;
