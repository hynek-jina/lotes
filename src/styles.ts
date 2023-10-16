import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    flex: 1,
  },
  secondaryButton: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flex: 1,  
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: colors.secondary,
    textAlign: "center",
  },
  buttonLink: {
    color: colors.primary,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonSpace: {
    margin: 10,
  },
  sectionHeader: {
    color: colors.text,
    fontWeight: "bold",
    textAlign: "center",
    height: 24,
  },
  redText: {
    color: colors.alert,
  },
  right: {
    position: "absolute",
    top: 40,
    right: 4,
  },
  left: {
    position: "absolute",
    top: 40,
    left: 4,
  },
  header: {
    // height: 80,
    width: "100%",
    borderBottomColor: "#333",
    color: colors.primary,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    height: 80,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 340,
  },
  carouselRenderView: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  carouselImageSize: {
    width: 200,
    height: 200,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.secondary,
  },
  carouselDotInactive: {
    backgroundColor: "black",
  },
  carouselViewFix: {
    height: '50%'
  },
});
