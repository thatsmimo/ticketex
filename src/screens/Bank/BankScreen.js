import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const BankScreen = ({ navigation }) => {
  const [bankList, setBankList] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchBankList();
  }, []);

  const fetchBankList = async () => {
    setLoader(true);
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
    </View>
  );

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.BankAccount} navigation={navigation} />
      <View style={styles.container}>
        <FlatList
          // contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
          data={bankList}
          // ItemSeparatorComponent={Separator}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={loader}
          onRefresh={fetchBankList}
          ListHeaderComponent={() => (
            <>
              <Image
                source={Assets.ic_bank}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoTxt}>{Languages.BankAccount}</Text>
            </>
          )}
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
