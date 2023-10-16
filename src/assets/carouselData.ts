export interface CarouselDataInterface {
    id: number;
    name: string;
    image: any; // what should be here?
  }

  export const carouselData: CarouselDataInterface[] = [
    {
      id: 1,
      name: "Upload your Lightning nOTE to an NFC card",
      image: require("../assets/Carousel1.png"),
    },
    {
      id: 2,
      name: "Physically hand the card to someone",
      image: require("../assets/Carousel2.png"),
    },
    {
      id: 3,
      name: "The recipient can claim the funds anytime",
      image: require("../assets/Carousel3.png"),
    },
  ];