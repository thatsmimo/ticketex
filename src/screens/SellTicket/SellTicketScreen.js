import React from "react";
import { View, Text, FlatList, I18nManager } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SellTicketScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.SellTicket} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          data={["", "", ""]}
          ListHeaderComponent={
            <Text
              style={{
                fontFamily: "regular",
                fontSize: 15,
                marginBottom: 15,
                textAlign: I18nManager.isRTL ? "left" : "left",
              }}
            >
              {Languages.MyListing}
            </Text>
          }
          ItemSeparatorComponent={Separator}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const renderList = ({ index }) => {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Ticket {index + 1}</Text>
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
        <Text style={CommonStyles.dateTxt}>SUN 3 NOVEMBER</Text>
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
