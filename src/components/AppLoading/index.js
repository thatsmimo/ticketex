import React from "react";
import { View, Text } from "react-native";
import { Languages } from "../../js/common";

const AppLoading = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 25, fontFamily: "semi" }}>
        {Languages.Loading}...
      </Text>
    </View>
  );
};

export default AppLoading;
