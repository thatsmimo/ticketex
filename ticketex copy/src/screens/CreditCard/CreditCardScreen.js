import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Colors, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const CreditCardScreen = ({ navigation }) => {
  const [cardList, setCardList] = useState(null);

  const insets = useSafeAreaInsets();
  const _handleNavigate = () => navigation.navigate("AddCreditCard");

  useEffect(() => {
    fetchCardList();
  }, []);

  const fetchCardList = async () => {
    const header = {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
    };
    const response = await Api.get("card/list",null,header);
    if (response.status) {
      setCardList(response.cards);
    }
  };

  const renderList = ({ item, index }) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardLeftContainer}>
        <View style={styles.cardTopDetails}>
          <View>
            <Text style={styles.cardHeadTxt}>{Languages.CardNumber}</Text>
            <Text style={styles.cardTxt}>{item.card_number}</Text>
          </View>
          {/* <View style={styles.cardImgContainer}>
        <Image
          source={require("../../../assets/images/visa.png")}
          resizeMode="center"
          style={styles.cardImg}
        />
      </View> */}
        </View>
        <Separator color={Colors.lineColor} height={40} />
        <View style={styles.cardBtmDetails}>
          <View>
            <Text style={styles.cardHeadTxt}>{Languages.CardHolderName}</Text>
            <Text style={styles.cardTxt}>{item.holder_name}</Text>
          </View>
          <View>
            <Text style={styles.cardHeadTxt}>{Languages.Expire}</Text>
            <Text
              style={styles.cardTxt}
            >{`${item.expire_month} / ${item.expire_year}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.CreditCard} navigation={navigation} />
      <View style={styles.container}>
        <Image source={Assets.ic_cc} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTxt}>{Languages.CreditCard}</Text>
        <FlatList
          // contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
          data={cardList}
          // ItemSeparatorComponent={Separator}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={Separator}
          // ListFooterComponent={<Separator heigh={30} />}
        />
        <AppButton
          name={Languages.AddNewCreditCard}
          _handleOnPress={_handleNavigate}
          containerStyle={CommonStyles.appBtn}
        />
      </View>
    </View>
  );
};

export default CreditCardScreen;
