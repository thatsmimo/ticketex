import { StyleSheet, I18nManager } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    padding: 20,
  },
  cardDetailsTitle: {
    fontFamily: "regular",
    fontSize: 14,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
});
