import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({

  input: {
    // fontFamily: "regular",
    fontSize: 15,
    alignItems: "center",
    width: 240,
    height: 40,
    marginTop: 5,
    borderWidth: 0.5,
    borderRadius: 45 / 2,
    paddingLeft: 13,
    borderColor: Colors.lineColor,
  },
});
