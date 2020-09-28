import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { Languages, Colors, IconDir, CommonStyles } from "../../js/common";
import { Ionicons } from "@expo/vector-icons";

const MyAccountItems = ({ items, _handleNavigate }) => {
  return (
    <TouchableOpacity
      onPress={() => _handleNavigate(items.navigation)}
      style={[CommonStyles.cardNoBg, styles.container]}
    >
      <Image source={items.icon} style={styles.leftImg} />
      <Text style={styles.titleTxt}>{Languages[items.name]}</Text>
      <Ionicons
        name={IconDir.Ionicons.forward}
        size={20}
        color={Colors.lineColor}
        style={styles.backIcon}
      />
    </TouchableOpacity>
  );
};

export default MyAccountItems;
