import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    paddingHorizontal: 30,
  },
  logo: { width: "100%" },
  logoTxt: { fontFamily: "semi", fontSize: 18, textAlign: "center" },
  card: {
    backgroundColor: Colors.lineColor,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  cardLeftContainer: { flex: 1, marginRight: 10 },
  cardHeadTxt: {
    fontSize: 15,
    fontFamily: "semi",
    color: Colors.background,
    textTransform: "capitalize",
  },
  cardTxt: {
    fontSize: 14,
    fontFamily: "semi",
    marginTop: 5,
    color: Colors.background,
  },
  cardTopDetails: { flexDirection: "row", justifyContent: "space-between" },
  cardImgContainer: {
    borderRadius: 10,
    width: 80,
    height: 40,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  cardImg: { height: 40, width: 60 },
  cardBtmDetails: { flexDirection: "row", justifyContent: "space-between" },
});
