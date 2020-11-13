import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "../../js/common";
import styles from "./styles";

const Loader = ({ show }) => (
  <>
    {show && (
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    )}
  </>
);

export default Loader;
