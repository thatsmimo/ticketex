import { StyleSheet } from "react-native";
import { Colors, CommonStyles } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    // padding: 30,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 15,
    height: 110,
    ...CommonStyles.shadow,
  },
  cardUserImg: { height: 70, width: 70, borderRadius: 8 },
  cardDetailsContainer: { flex: 1, paddingLeft: 10 },
  cardDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetailsTitle: {
    fontFamily: "regular",
    fontSize: 14,
  },
  dateTxt: {
    fontFamily: "regular",
    fontSize: 13,
    color: Colors.lineColor,
  },
  priceTxt: {
    fontFamily: "regular",
    fontSize: 15,
  },
});
