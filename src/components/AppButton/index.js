import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

// if password field, enable inputForPassword, no need to give keyBoardType, it will take to default
const AppButton = ({ name = "", containerStyle, _handleOnPress, disabled }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.mainContainer, { ...containerStyle }]}
      onPress={_handleOnPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
