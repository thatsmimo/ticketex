import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BalanceScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.Balance} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={Assets.ic_balance}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTxt}>{Languages.YourSellingBalanceIs}</Text>
        <Separator />
        <Text style={styles.logoTxt}>350 SAR</Text>
        <Separator />
        <Text style={styles.bigTxt}>{Languages.BalancePageBigText}</Text>
        <AppButton
          name={Languages.WithdrawBalance}
          containerStyle={CommonStyles.appBtn}
        />
      </View>
    </View>
  );
};

export default BalanceScreen;
