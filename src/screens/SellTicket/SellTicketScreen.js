import React, { useState, useEffect } from "react";
import { View, Text, FlatList, I18nManager } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { StatusBar } from "expo-status-bar";

const SellTicketScreen = () => {
  const [sellList, setSellList] = useState(null);
  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoader(true);
    // const response = await Api.get("ticket/sell"); // OFF due to api modification ongoing
    setLoader(true);
    console.log("SellTicketScreen: ", response);
    if (response.status) setSellList(response.tickets);
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.SellTicket} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          data={sellList}
          // ListHeaderComponent={
          //   <Text
          //     style={{
          //       fontFamily: "regular",
          //       fontSize: 15,
          //       marginBottom: 15,
          //       textAlign: I18nManager.isRTL ? "left" : "left",
          //     }}
          //   >
          //     {Languages.MyListing}
          //   </Text>
          // }
          ItemSeparatorComponent={Separator}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={loader}
          onRefresh={fetchList}
        />
      </View>
    </View>
  );
};

const renderList = ({ item, index }) => {
  let iconName = IconDir.Ionicons.check;
  let iconColor = Colors.positive;
  let iconText = Languages.Sold;

  switch (index) {
    case 0:
      break;
    case 1:
      iconColor = Colors.negative;
      iconText = Languages.Expired;
      iconName = IconDir.Ionicons.close;
      break;
    case 2:
      iconColor = Colors.neutral;
      iconText = Languages.Listed;
      iconName = IconDir.Ionicons.menu;
      break;
  }
  return (
    <View style={CommonStyles.cardLine}>
      <StatusBar style={"dark"} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{item.serial}</Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
          }}
        >
          350 SAR
        </Text>
      </View>
      <Separator />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={CommonStyles.dateTxt}>{item.date}</Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            color: Colors.lineColor,
            flex: 1,
            textAlign: "right",
            marginHorizontal: 10,
          }}
        >
          {iconText}
        </Text>
        <View
          style={{
            height: 25,
            width: 25,
            borderRadius: 25 / 2,
            backgroundColor: iconColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={iconName} color={Colors.background} size={20} />
        </View>
      </View>
    </View>
  );
};
export default SellTicketScreen;
