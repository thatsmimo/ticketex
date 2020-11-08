import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { notify } from "../../utils";

const AddBankScreen = ({ navigation, route }) => {
  const [iban, setIban] = useState("");
  const [benfName, setBenfName] = useState("");
  const [bankName, setBankName] = useState("");
  const insets = useSafeAreaInsets();

  const _handlenavigate = async () => {
    if (iban === "") {
      notify(Languages.EnterYourBankIban);
      return;
    }
    if (benfName === "") {
      notify(Languages.EnterYourBankBeneficiaryName);
      return;
    }
    if (bankName === "") {
      notify(Languages.EnterYourBankName);
      return;
    }
    const params = {
      iban: iban,
      beneficiaryName: benfName,
      bankName: bankName,
    };
    const bankDetails = await Api.post("account/create", params);
    console.log(bankDetails);
    if (bankDetails.status) {
      notify(bankDetails.message);
    }
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddBankAccount} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={Assets.ic_bank}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTxt}>{Languages.AddBankAccount}</Text>
        <AppEditText hint={Languages.IBAN} saveText={(text) => setIban(text)} />
        <AppEditText
          hint={Languages.BeneficiaryName}
          saveText={(text) => setBenfName(text)}
        />
        <AppEditText
          hint={Languages.BankName}
          saveText={(text) => setBankName(text)}
        />
        {/* <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTxt}>{Languages.BankName}</Text>
          <Ionicons
            name={IconDir.Ionicons.down}
            size={20}
            color={Colors.lineColor}
            style={styles.downIcon}
          />
        </View> */}
        <AppButton
          name={Languages.AddNewBank}
          containerStyle={CommonStyles.appBtn}
          _handleOnPress={_handlenavigate}
        />
      </View>
    </View>
  );
};

export default AddBankScreen;
