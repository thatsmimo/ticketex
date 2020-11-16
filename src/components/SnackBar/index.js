import React from "react";
import { Snackbar } from "react-native-paper";
import { Colors } from "../../js/common";

const index = ({ visible, onDismissSnackBar, msg }) => (
  <Snackbar
    visible={visible}
    onDismiss={onDismissSnackBar}
    duration={2000}
    style={{ backgroundColor: Colors.accent }}
  >
    {msg || ""}
  </Snackbar>
);

export default index;
