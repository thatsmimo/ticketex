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
  dropdownContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 45 / 2,
    paddingLeft: 5,
    marginTop: 15,
    borderColor: Colors.lineColor,
    borderWidth: 0.5,
  },
  dropdownTxt: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#1d1d1d",
    paddingLeft: 10,
    flex: 1,
  },
  downIcon: { marginRight: 15 },
});
