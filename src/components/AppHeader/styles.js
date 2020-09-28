import { StyleSheet, I18nManager } from "react-native";
import { CommonStyles } from "../../js/common";

export default StyleSheet.create({
  container: {
    paddingVertical: 15,
    // elevation: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    ...CommonStyles.shadow,
  },
  backIcon: (nav) => ({
    justifyContent: "center",
    marginLeft: nav ? 0 : 15,
  }),
  titleTxt: {
    fontFamily: "regular",
    fontSize: 19,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  descTxt: {
    fontFamily: "regular",
    fontSize: 15,
    marginTop: 3,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
});
