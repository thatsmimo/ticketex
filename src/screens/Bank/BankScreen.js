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

  useEffect(() => {
    fetchBankList();
  }, []);

  const fetchBankList = async () => {
    const response = await Api.get("account/list");
    if (response.status) {
      setBankList(response.accounts);
    }
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
