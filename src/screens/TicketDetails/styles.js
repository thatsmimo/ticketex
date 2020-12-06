import { StyleSheet, I18nManager } from "react-native";
import { Colors, CommonStyles } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
  },
  headerBigImg: { height: 300, width: "100%", top: -30 },
  headerTopContainer: { ...StyleSheet.absoluteFill, marginTop: 20, padding: 0 },
  headerBigTxt: {
    color: Colors.background,
    fontFamily: "bold",
    fontSize: 22,
    marginHorizontal: 20,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  headerBtmContainer: {
    position: "absolute",
    zIndex: 9,
    left: 0,
    right: 0,
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerOpacityContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(98,60,100,.6)",
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 10,
  },
  whiteTxt13: {
    color: Colors.background,
    fontFamily: "regular",
    fontSize: 13,
  },
  whiteSeparatorHorizontal: {
    width: 1,
    backgroundColor: Colors.background,
    marginHorizontal: 15,
  },
  card: (isInitial) => ({
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomStartRadius: 8,
    backgroundColor: Colors.background,
    marginTop: isInitial ? -40 : 10,
    ...CommonStyles.shadow,
    alignItems: "flex-start",
  }),
  rowAsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  bodyHeaderTxt: {
    fontFamily: "bold",
    fontSize: 22,
    marginRight: 10,
  },
  extraTxt: { fontFamily: "regular", fontSize: 13 },
  itemIconTxt: {
    fontFamily: "regular",
    fontSize: 13,
    paddingHorizontal: 15,
    marginTop: 10,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  padding20: { padding: 20 },
  item2ndTxt: {
    fontSize: 11,
    color: Colors.lineColor,
    marginLeft: 10,
    fontFamily: "regular",
    paddingRight: 5,
    paddingLeft: 5,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
});
