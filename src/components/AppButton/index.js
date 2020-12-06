import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors } from "../../js/common";
import styles from "./styles";

// if password field, enable inputForPassword, no need to give keyBoardType, it will take to default
const AppButton = ({ name = "", containerStyle, _handleOnPress, disabled }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.mainContainer(disabled), { ...containerStyle }]}
      onPress={_handleOnPress}
      disabled={disabled}
    >
      {disabled ? (
        <ActivityIndicator size="large" color={Colors.background} />
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
