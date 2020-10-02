import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const PurchasedTicketScreen = ({ navigation }) => {
  const [purchasedList, setPurchasedList] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    List();
  }, []);

  const List = async () => {
    const header = {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
    };
    const response = await Api.get("ticket/purchased", null, header);
    setPurchasedList(response.tickets);
  };

  const renderList = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PurchasedTicketDetails")}
        style={CommonStyles.cardNoBg}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../assets/images/player.png")}
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
        />
      </View>
    </View>
  );
};

export default PurchasedTicketScreen;
