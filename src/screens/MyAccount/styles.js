import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: { backgroundColor: Colors.container, flex: 1, padding: 30 },
  signOutTxt: {
    fontFamily: "semi",
    fontSize: 18,
    color: Colors.negative,
    textAlign: "center",
    marginTop: 30,
  },
  rtlTxt: {
    fontFamily: "semi",
    fontSize: 18,
    color: Colors.primary,
    textAlign: "center",
    marginTop: 30,
  },
});
