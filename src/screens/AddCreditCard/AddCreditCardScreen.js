import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText, Separator } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddCreditCardScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const _handleNavigate = {};
  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddNewCreditCard} navigation={navigation} />
      <View style={styles.container}>
        <Image source={Assets.ic_cc} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTxt}>{Languages.AddNewCreditCard}</Text>
        <AppEditText hint={Languages.CardNumber} />
        <AppEditText hint={Languages.CardHolderName} />
        <View style={{ flexDirection: "row" }}>
          <AppEditText
            hint={Languages.CVV}
            containerStyle={styles.editTxtExtra}
          />
          <Separator width={10} />
          <AppEditText
            hint={Languages.Expire + " /"}
            containerStyle={styles.editTxtExtra}
          />
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

export default AddCreditCardScreen;
