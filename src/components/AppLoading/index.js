import React from "react";
import { View, Text } from "react-native";

const AppLoading = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 25, fontFamily: "semi" }}>Loading...</Text>
    </View>
  );
};

export default AppLoading;
