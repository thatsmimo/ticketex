import React from "react";
import { I18nManager } from "react-native";
import { Text } from "react-native";
import { Colors } from "../../js/common";

const FieldHeader = ({ name, containerStyle }) => (
  <Text
    style={{
      fontFamily: "semi",
      marginTop: 20,
      marginBottom: 5,
      color: Colors.text,
      textAlign: I18nManager.isRTL ? "left" : "left",
      ...containerStyle,
    }}
  >
    {name}
  </Text>
);

export default FieldHeader;
