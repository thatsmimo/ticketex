import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, Separator, AppButton, Loader } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_DEFAULTS } from "../../utils";
import Api from "../../js/service/api";

const BalanceScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const response = await Api.get("user/getBalance");
    console.log("getBalance: ", response);
    setLoader(false);
    if (response.status) {
      setBalance(response.balance);
    }
  };

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
        <Text style={styles.logoTxt}>
          {balance} {APP_DEFAULTS.currency}
        </Text>
        <Separator />
        <Text style={styles.bigTxt}>{Languages.BalancePageBigText}</Text>
        <AppButton
          name={Languages.WithdrawBalance}
          containerStyle={CommonStyles.appBtn}
        />
      </View>
      <Loader show={loader} />
    </View>
  );
};

export default BalanceScreen;
