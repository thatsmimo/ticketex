import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText } from "../../components";
import {
  Languages,
  Colors,
  Assets,
  IconDir,
  CommonStyles,
} from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { notify } from "../../utils";

const AddBankScreen = ({ navigation, route }) => {
  console.log("route: ", route);
  const [iban, setIban] = useState('');
  const [benfName, setBenfName] = useState("");
  const [bankName, setBankName] = useState("");
  const insets = useSafeAreaInsets();

  const ibanValidation = (value) => {
    let Exp = /[0-9a-zA-Z]/;
    if (Exp.test(value)) {
      return true;
    } else {
      return false;
    }
  };
  const nameValidation = (value) => {
    let Exp = /[a-zA-Z]/;
    if (Exp.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const _handlenavigate = async () => {
    if (iban === "") {
      notify("Please enter your bank iban.");
      return;
    }
    if (benfName === "") {
      notify("Please enter your bank beneficiary name.");
      return;
    }
    if (bankName === "") {
      notify("Please enter your bank name.");
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
