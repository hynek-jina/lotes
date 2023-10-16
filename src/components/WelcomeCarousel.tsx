import React, { useState, useRef } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { styles } from "../styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { carouselData, CarouselDataInterface } from "../assets/carouselData";

const SLIDER_WIDTH = Dimensions.get("window").width + 30;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export function WelcomeCarousel(): JSX.Element {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const renderItem = ({ item }: { item: CarouselDataInterface }) => {
    return (
      <View style={styles.carouselRenderView}>
        <Image source={item.image} style={styles.carouselImageSize} />
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.carouselViewFix}>
      <Carousel
        ref={isCarousel}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
      ></Carousel>
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.carouselDot}
        tappableDots={true}
        inactiveDotStyle={styles.carouselDotInactive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
