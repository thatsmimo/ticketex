import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const PurchasedTicketScreen = ({ navigation }) => {
  const [purchasedList, setPurchasedList] = useState(null);
  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoader(true);
    const response = await Api.get("ticket/purchased");
    setPurchasedList(response.tickets);
    setLoader(false);
  };

  const renderList = ({ item }) => {
    console.log(item.image_url);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PurchasedTicketDetails", item.id)}
        style={CommonStyles.cardNoBg}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: item.image_url,
            }}
            style={styles.cardUserImg}
          />
          <View style={{ paddingLeft: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.cardDetailsTitle}>{item.name}</Text>
              <View style={CommonStyles.mainChipContainer}>
                <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
                  King Cup
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 5,
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              <Text style={CommonStyles.dateTxt}>{item.date}</Text>
              <Separator width={10} />
              <Text style={CommonStyles.dateTxt}>{item.location}</Text>
            </View>
            <Separator height={5} />
            <Text style={styles.priceTxt}>350 SAR</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.PurchasedTicket} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          data={purchasedList}
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

export default PurchasedTicketScreen;
