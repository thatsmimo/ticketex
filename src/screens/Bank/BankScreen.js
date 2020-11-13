import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { notify } from "../../utils";

const BankScreen = ({ navigation }) => {
  const [bankList, setBankList] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchBankList();
  }, []);

  const fetchBankList = async () => {
    setLoader(true);
    // const header = {
    //   Authorization:
    //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
    // };

    const response = await Api.get("account/list");
    console.log("response: ", response);
    if (response.status) {
      setBankList(response.accounts);
    }
    setLoader(false);
  };

  const _handleNavigate = () => navigation.navigate("AddBank");
  const insets = useSafeAreaInsets();

  const renderList = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.cardLeftContainer}>
        <Text style={styles.cardHeadTxt}>{Languages.BankName}</Text>
        <Text style={styles.cardTxt}>{item.bank_name}</Text>
        <Separator />
        <Text style={styles.cardHeadTxt}>{Languages.IBAN}</Text>
        <Text style={styles.cardTxt}>{item.iban}</Text>
        <Separator />
        <Text style={styles.cardHeadTxt}>{Languages.BeneficiaryName}</Text>
        <Text style={styles.cardTxt}>{item.ben_name}</Text>
      </View>
      {/* <Image
      source={{
        uri:
          "https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
      }}
      style={styles.cardUserImg}
      resizeMode="center"
    /> */}
    </View>
  );

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.BankAccount} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={Assets.ic_bank}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTxt}>{Languages.BankAccount}</Text>
        <FlatList
          // contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
          data={bankList}
          // ItemSeparatorComponent={Separator}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={loader}
          onRefresh={fetchBankList}
          // ListHeaderComponent={Separator}
          // ListFooterComponent={<Separator heigh={30} />}
        />
        <AppButton
          name={Languages.AddNewBank}
          _handleOnPress={_handleNavigate}
          containerStyle={CommonStyles.appBtn}
        />
      </View>
    </View>
  );
};

export default BankScreen;
