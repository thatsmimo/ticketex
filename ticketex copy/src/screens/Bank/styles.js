import { StyleSheet, I18nManager } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    padding: 30,
  },
  logo: { width: "100%" },
  logoTxt: { fontFamily: "semi", fontSize: 18, textAlign: "center" },
  card: {
    borderColor: Colors.lineColor,
    borderWidth: 0.4,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  cardLeftContainer: { flex: 1, marginRight: 10 },
  cardHeadTxt: {
    fontSize: 15,
    fontFamily: "semi",
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  cardTxt: {
    fontSize: 14,
    fontFamily: "semi",
    marginTop: 5,
    color: Colors.lineColor,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  cardUserImg: { height: 113, width: 113, borderRadius: 8 },
});
