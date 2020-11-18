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
import { APP_DEFAULTS } from "../../utils";

const SellTicketScreen = () => {
  const [sellList, setSellList] = useState(null);
  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // fetchList();
  }, []);

  const fetchList = async () => {
    const response = await Api.get("ticket/sell");
    setLoader(false);
    console.log("SellTicketScreen: ", response);
    if (response.status) {
      setSellList(response.data);
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

  // switch (index) {
  //   case 0:
  //     break;
  //   case 1:
  //     iconColor = Colors.negative;
  //     iconText = Languages.Expired;
  //     iconName = IconDir.Ionicons.close;
  //     break;
  //   case 2:
  //     iconColor = Colors.neutral;
  //     iconText = Languages.Listed;
  //     iconName = IconDir.Ionicons.menu;
  //     break;
  // }
  return (
    <View style={CommonStyles.cardLine}>
      <StatusBar style={"dark"} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{item.name}</Text>
        <Text
          style={{
            fontFamily: "regular",
            fontSize: 15,
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
        <Text style={CommonStyles.dateTxt}>Nov 2 2020</Text>
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
