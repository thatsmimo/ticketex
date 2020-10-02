import { StyleSheet } from "react-native";
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
  },
  btn: {
    width: 240,
  },
  input: {
    marginTop:20,
    alignItems:"center",
    width: 240,
  },
  text:{
      textAlign:"justify",
      paddingHorizontal:80,
      paddingTop:50,
      color:"red"

  }
});
