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
    const response = await Api.get("card/list");
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
