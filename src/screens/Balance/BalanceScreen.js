import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, I18nManager } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Assets, CommonStyles, Colors } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_DEFAULTS, globalDateFormatter } from "../../utils";
import Api from "../../js/service/api";

const BalanceScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(true);
  const [withdrawList, setWithdrawList] = useState(null);

  useEffect(() => {
    if (route.params?.isAdded) {
      // when added
      getBalance();
      fetchWithdrawList();
    }
  }, [route, route.params?.isAdded]);

  useEffect(() => {
    getBalance();
    fetchWithdrawList();
  }, []);

  const getBalance = async () => {
    const response = await Api.get("user/getBalance");
    console.log("getBalance: ", response);
    setLoader(false);
    if (response.status) {
      setBalance(response.balance);
    }
  };

  const fetchWithdrawList = async () => {
    setLoader(true);
    const response = await Api.get("withdrawBalanceList");
    console.log("response: ", response);
    setWithdrawList(response.reverse());
    setLoader(false);
  };

  const renderList = ({ item, index }) => (
    <View
      style={{
        marginHorizontal: 20,
        borderWidth: 0.5,
        borderColor: Colors.lineColor,
        padding: 10,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: "black",
            marginRight: 10,
          }}
        >
          {Languages.UniqueId}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: "black",
          }}
        >
          {item.uniqueId}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: "black",
            marginRight: 10,
          }}
        >
          {Languages.AccountId}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: "black",
          }}
        >
          {item.accountId}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: "black",
            textAlign: I18nManager.isRTL ? "left" : "left",
          }}
        >
          {globalDateFormatter(item.created_at)}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: "black",
            textAlign: I18nManager.isRTL ? "left" : "left",
          }}
        >
          {item.amount} {APP_DEFAULTS.currency}
        </Text>
      </View>
    </View>
  );

  const _handleOnPress = () => navigation.navigate("Withdraw");

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.Balance} navigation={navigation} />
      <FlatList
        data={withdrawList}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={loader}
        onRefresh={fetchWithdrawList}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 50 }} />}
        ListHeaderComponent={() => (
          <View style={{ padding: 30, alignItems: "center" }}>
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
              _handleOnPress={_handleOnPress}
            />
            <Text
              style={[
                styles.logoTxt,
                { marginTop: 20, alignSelf: "flex-start", marginBottom: -10 },
              ]}
            >
              {Languages.WithdrawBalanceHistory}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default BalanceScreen;
