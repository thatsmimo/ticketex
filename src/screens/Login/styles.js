import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: { backgroundColor: Colors.container, flex: 1, padding: 30 },
  logo: { width: "100%", marginTop: 30 },
  resendOtp: {
    fontFamily: "regular",
    textAlign: "center",
    marginTop: 20,
    color: Colors.lineColor,
  },
});
