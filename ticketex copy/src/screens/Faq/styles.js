import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    padding: 30,
    alignItems: "center",
    alignItems: "center",
  },
  logo: { width: "100%" },
  logoTxt: { fontFamily: "semi", fontSize: 18 },
  bodyTxt: { fontFamily: "semi", textAlign: "center" },
});
