import React, { useContext, useState } from "react";
import { View, Text, I18nManager } from "react-native";
import { AppHeader, MyAccountItems } from "../../components";
import { Languages, Config, CommonStyles } from "../../js/common";
import styles from "./styles";
import { AuthContext } from "../../js/context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Updates from "expo-updates";

const MyAccountScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { signOut } = useContext(AuthContext);
  const [isRtl] = useState(I18nManager.isRTL);

  const _handleNavigate = (nav) => {
    navigation.navigate(nav);
  };
  const _handleLogOut = () => {
    signOut();
  };
  const _handleRtl = () => {
    I18nManager.forceRTL(!isRtl);
    Updates.reloadAsync();
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.MyAccount} />
      <View style={styles.container}>
        {Config.myAccountElementsArr.map((e, i) => (
          <MyAccountItems
            key={i}
            items={e}
            navigate={navigation.navigate}
            _handleNavigate={_handleNavigate}
          />
        ))}
        <Text onPress={_handleLogOut} style={styles.signOutTxt}>
          {Languages.SignOut}
        </Text>
        <Text onPress={_handleRtl} style={styles.rtlTxt}>
          {isRtl ? "Switch to english" : "Switch to arabic"}
        </Text>
      </View>
    </View>
  );
};

export default MyAccountScreen;
