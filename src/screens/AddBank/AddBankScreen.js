import React, { useState } from "react";
import { View, Text, Image, I18nManager } from "react-native";
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
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    const params = {
      iban: iban,
      beneficiaryName: benfName,
      bankName: bankName,
    };
    const bankDetails = await Api.post("account/create", params);
    console.log(bankDetails);
    if (bankDetails.status) {
      setBenfName("");
      setIban("");
      setBankName("");
    }
    notify(bankDetails.message);
    setLoader(false);
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
        <AppEditText
          hint={Languages.IBAN}
          value={iban}
          textAlign={!I18nManager.isRTL ? "left" : "right"}
          saveText={(text) => setIban(text)}
        />
        <AppEditText
          value={benfName}
          hint={Languages.BeneficiaryName}
          textAlign={!I18nManager.isRTL ? "left" : "right"}
          saveText={(text) => setBenfName(text)}
        />
        <AppEditText
          value={bankName}
          hint={Languages.BankName}
          textAlign={!I18nManager.isRTL ? "left" : "right"}
          saveText={(text) => setBankName(text)}
        />
        <AppButton
          name={Languages.AddNewBank}
          containerStyle={CommonStyles.appBtn}
          textAlign={!I18nManager.isRTL ? "left" : "right"}
          _handleOnPress={_handlenavigate}
          disabled={loader}
        />
      </View>
    </View>
  );
};

export default AddBankScreen;
