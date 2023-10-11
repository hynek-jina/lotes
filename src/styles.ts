import { StyleSheet } from "react-native";

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
    backgroundColor: "purple",
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "blue",
    textAlign: "center",
  },
  buttonLink: {
    color: "purple",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonSpace: {
margin: 10
  },
  sectionHeader: {
    color: "010101",
    fontWeight: "bold",
    textAlign: "center",
    height: 24,
  },
  redText: {
    color: "#F00",
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
    color: "#000",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeader: {
    height: 80,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});
