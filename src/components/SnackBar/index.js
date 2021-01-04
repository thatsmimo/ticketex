import React from "react";
import { Snackbar } from "react-native-paper";
import { Colors } from "../../js/common";

const index = ({ visible, onDismissSnackBar, msg, bottom }) => (
  <Snackbar
    visible={visible}
    onDismiss={onDismissSnackBar}
    duration={2000}
    style={{ backgroundColor: Colors.accent, bottom: bottom }}
  >
    {msg || ""}
  </Snackbar>
);

export default index;
