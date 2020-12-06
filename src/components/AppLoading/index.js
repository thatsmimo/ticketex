import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "../../js/common";

const AppLoading = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        ...StyleSheet.absoluteFill,
        zIndex: 9,
      }}
    >
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default AppLoading;
