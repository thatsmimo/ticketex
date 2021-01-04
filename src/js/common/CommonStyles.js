import { StyleSheet, I18nManager } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  screensRootContainer: (insetsTop) => ({
    paddingTop: insetsTop,
    flex: 1,
    backgroundColor: "#fff",
  }),
  tabBarContainerStyle: {
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: "transparent",
    overflow: "hidden",
  },
  appBtn: { marginTop: 10 },
  dateTxt: {
    fontFamily: "regular",
    fontSize: 13,
    color: Colors.lineColor,
    marginRight: 10,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  cardNoBg: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 15,
  },
  cardLine: {
    borderColor: Colors.lineColor,
    borderWidth: 0.4,
    borderRadius: 8,
    padding: 15,
    backgroundColor: Colors.background,
  },
  mainChipContainer: {
    backgroundColor: Colors.primary,
    minWidth: 50,
    maxWidth: 80,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 3,
  },
  mainChipTxt: {
    color: Colors.background,
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 12.5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    shadowColor: "#bdbdbd",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 1,
    width: "100%",
  },
  marginTop50: { marginTop: 50 },
  appModalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    maxHeight: "60%",
  },
});
