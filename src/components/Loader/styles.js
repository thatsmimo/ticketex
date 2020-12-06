import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 9999,
  },
});
