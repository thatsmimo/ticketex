import React from "react";
import { View, TextInput } from "react-native";
import styles from "./styles";

// if password field, enable inputForPassword, no need to give keyBoardType, it will take to default
const AppEditText = ({
  hint,
  saveText,
  value,
  inputForPassword = false,
  keyBoardType = "default",
  maxLength = null,
  containerStyle,
  multiline,
  textAlign,
}) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          ...containerStyle,
        },
      ]}
    >
      <TextInput
        value={value}
        autoCapitalize="none"
        keyboardType={inputForPassword ? keyBoardType : keyBoardType}
        // keyboardType={"number-pad"}
        secureTextEntry={inputForPassword}
        placeholder={hint}
        placeholderTextColor="#727272" //static
        style={styles.textInputStyle}
        onChangeText={saveText}
        maxLength={maxLength}
        multiline={multiline}
        // textAlign={textAlign}
      />
    </View>
  );
};

export default AppEditText;
