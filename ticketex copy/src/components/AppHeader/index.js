import React from "react";
import { Text, View, I18nManager } from "react-native";
import styles from "./styles";
import { IconDir, Colors } from "../../js/common";
import { IconButton } from "react-native-paper";

const AppHeader = ({ title = "", desc, navigation }) => {
  return (
    <View style={styles.container}>
      {navigation && (
        <IconButton
          icon={
            I18nManager.isRTL
              ? IconDir.MaterialCommunityIcons.arrowRight
              : IconDir.MaterialCommunityIcons.arrowLeft
          } // support materialIcons only
          color={Colors.lineColor}
          size={30}
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={styles.backIcon(navigation)}>
        <Text style={styles.titleTxt}>{title}</Text>
        {desc && <Text style={styles.descTxt}>{desc}</Text>}
      </View>
    </View>
  );
};

export default AppHeader;
