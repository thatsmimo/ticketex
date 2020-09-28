import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, Separator, AppButton } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BankScreen = ({ navigation }) => {
  const _handleNavigate = () => navigation.navigate("AddBank");
  const insets = useSafeAreaInsets();

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
        <View style={styles.card}>
          <View style={styles.cardLeftContainer}>
            <Text style={styles.cardHeadTxt}>{Languages.BankName}</Text>
            <Text style={styles.cardTxt}>ALRAJHI BANK</Text>
            <Separator />
            <Text style={styles.cardHeadTxt}>{Languages.IBAN}</Text>
            <Text style={styles.cardTxt}>4125112285479874</Text>
            <Separator />
            <Text style={styles.cardHeadTxt}>{Languages.BeneficiaryName}</Text>
            <Text style={styles.cardTxt}>ALI ABDULKARIM</Text>
          </View>
          <Image
            source={{
              uri:
                "https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg",
            }}
            style={styles.cardUserImg}
            resizeMode="center"
          />
        </View>
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
