import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    alignItems: "center",
  },
  logo: { width: "100%" },
  logoTxt: { fontFamily: "semi", fontSize: 18 },
  bodyHeader: {
    fontFamily: "semi",
    fontSize: 18,
  },
  bodyTxt: {
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: "semi",
    paddingBottom: 10,
  },
  listContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    elevation: 2,
  },
});
