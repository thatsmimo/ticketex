import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Colors, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreditCardScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const _handleNavigate = () => navigation.navigate("AddCreditCard");

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.CreditCard} navigation={navigation} />
      <View style={styles.container}>
        <Image source={Assets.ic_cc} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTxt}>{Languages.CreditCard}</Text>
        <View style={styles.card}>
          <View style={styles.cardLeftContainer}>
            <View style={styles.cardTopDetails}>
              <View>
                <Text style={styles.cardHeadTxt}>{Languages.CardNumber}</Text>
                <Text style={styles.cardTxt}>*********** 8048</Text>
              </View>
              <View style={styles.cardImgContainer}>
                <Image
                  source={require("../../../assets/images/visa.png")}
                  resizeMode="center"
                  style={styles.cardImg}
                />
              </View>
            </View>
            <Separator color={Colors.lineColor} height={40} />
            <View style={styles.cardBtmDetails}>
              <View>
                <Text style={styles.cardHeadTxt}>
                  {Languages.CardHolderName}
                </Text>
                <Text style={styles.cardTxt}>ALI A ALMANQOUR</Text>
              </View>
              <View>
                <Text style={styles.cardHeadTxt}>{Languages.Expire}</Text>
                <Text style={styles.cardTxt}>09/2021</Text>
              </View>
            </View>
          </View>
        </View>
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
