import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
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
  chipWithDate: (date) => ({
    backgroundColor: date ? "#FFAD89" : Colors.primary,
    paddingVertical: 5,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  }),
  chipWithDateTxt: {
    color: Colors.background,
    fontFamily: "regular",
    fontSize: 12.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    maxHeight: "80%",
  },
});
