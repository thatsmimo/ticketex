import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { StatusBar } from "expo-status-bar";
import { APP_DEFAULTS, globalDateFormatter, showAlert } from "../../utils";

// total : raw_qty
// sold: sold_qty
// available : qty

// "status": "a", -> active /// s -> sold  //// e -> expired
// "price": "100.00",
//           "name": "Regular 1",
//           created_at

const SellTicketScreen = () => {
  const [sellList, setSellList] = useState(null);
  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await Api.get("ticket/sell");
    setLoader(false);
    console.log("SellTicketScreen: ", response);
    if (response.status) {
      setSellList(response.data);
    } else {
      showAlert(Languages.Sorry, Languages.SomethingWentWrong);
    }
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.ListedTicket} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          data={sellList}
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

const renderList = ({ item }) => {
  let iconName = IconDir.Ionicons.check;
  let iconColor = Colors.positive;
  let iconText = Languages.Sold;

  switch (item.status) {
    case "s": // sold //green
      break;
    case "e": // expired // red
      iconColor = Colors.negative;
      iconText = Languages.Expired;
      iconName = IconDir.Ionicons.close;
      break;
    case "a": // listed //
      iconColor = Colors.neutral;
      iconText = Languages.Listed; //
      iconName = IconDir.Ionicons.menu;
      break;
  }
  return (
    <View style={CommonStyles.cardLine}>
      <StatusBar style={"dark"} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* {item.name && <Text>{item.name}</Text>} */}
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
            marginTop: 5,
          }}
        >
          {item.price} {APP_DEFAULTS.currency}
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
        <Text style={CommonStyles.dateTxt}>
          {globalDateFormatter(item.created_at)}
        </Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: Colors.lineColor,
          borderTopWidth: 0.5,
          marginTop: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
          }}
        >
          {Languages.Total} {item.raw_qty}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
          }}
        >
          {Languages.Sold}: {item.sold_qty}
        </Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
          }}
        >
          {Languages.Available}: {item.qty}
        </Text>
      </View>
    </View>
  );
};
export default SellTicketScreen;
