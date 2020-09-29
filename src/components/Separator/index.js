import React from "react";
import { View } from "react-native";
import { Colors } from "../../js/common";
import styles from "./styles";

const index = ({ height = 10, color, width }) => (
  <View style={styles.container(height, color, width)} />
);

export default index;
