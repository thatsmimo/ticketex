import React from "react";
import { Text } from "react-native";
import { Colors } from "../../js/common";

const FeildHeader = ({ name, containerStyle }) => (
  <Text
    style={{
      fontFamily: "semi",
      marginTop: 20,
      marginBottom: 5,
      color: Colors.text,
      ...containerStyle,
    }}
  >
    {name}
  </Text>
);

export default FeildHeader;
