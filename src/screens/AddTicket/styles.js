import { StyleSheet, I18nManager } from "react-native";
import { Colors } from "../../js/common";
import { StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    flex: 1,
    // paddingTop: 25,
    alignItems: "center",
    // justifyContent: "center",
  },
  form: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBG: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 45 / 2,
    paddingLeft: 5,
    borderColor: Colors.lineColor,
  },
  picker: {
    height: 40,
    width: 230,
    fontFamily: "regular",
    fontSize: 11,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    // width: 240,
    paddingHorizontal: "15%",
  },
  input: {
    marginTop: 0,
    alignItems: "center",
    width: 240,
  },
  text: {
    textAlign: "justify",
    paddingHorizontal: 80,
    paddingTop: 50,
    color: "red",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    maxHeight: "80%",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listText: {
    fontFamily: "regular",
    fontSize: 15,
    marginLeft: 15,
  },
  selectFieldContainer: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    padding: 13,
    alignItems: "center",
  },
  selectFieldText: {
    fontFamily: "semi",
    flex: 1,
    color: Colors.lineColor,
    textAlign: I18nManager.isRTL ? "left" : "left",
  },
  quantityContainer: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  quantityDecreaseContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightBlue,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
  },
  quantityIncreaseContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightBlue,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
  },
  quantityTextContainer: {
    fontFamily: "semi",
    color: Colors.lineColor,
    textAlign: "center",
    fontSize: 20,
  },
  quantityShowContainer: {
    padding: 13,
    width: 75,
    backgroundColor: Colors.lightBlue,
    justifyContent: "center",
    marginHorizontal: 2,
  },
});
