import { StyleSheet, I18nManager } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  mainContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 45 / 2,
    paddingLeft: 5,
    marginTop: 15,
    borderColor: Colors.lineColor,
    borderWidth: 0.5,
  },
  textInputStyle: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#1d1d1d",
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
    textAlign: !I18nManager.isRTL ? "left" : "right",
  },
});
