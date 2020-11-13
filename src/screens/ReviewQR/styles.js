import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    padding: 30,
    alignItems: "center",
  },
  logo: { width: "100%" },
  logoTxt: { fontFamily: "semi", fontSize: 18 },
  bigTxt: {
    fontFamily: "regular",
    fontSize: 15,
    textAlign: "center",
  },
});
