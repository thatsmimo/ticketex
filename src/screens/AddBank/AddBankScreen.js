import React, { useState } from "react";
import { View, Text, Image, I18nManager } from "react-native";
import { AppHeader, AppButton, AppEditText, SnackBar } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const AddBankScreen = ({ navigation, route }) => {
  const [iban, setIban] = useState("");
  const [benfName, setBenfName] = useState("");
  const [bankName, setBankName] = useState("");
  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

  const insets = useSafeAreaInsets();
  const [loader, setLoader] = useState(false);

  const _handlenavigate = async () => {
    if (iban === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterYourBankIban });
      return;
    }
    if (benfName === "") {
      setSnackBar({
        isShow: true,
        msg: Languages.EnterYourBankBeneficiaryName,
      });
      return;
    }
    if (bankName === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterYourBankName });
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
    setSnackBar({ isShow: true, msg: bankDetails.message });
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
          saveText={(text) => setIban(text)}
        />
        <AppEditText
          value={benfName}
          hint={Languages.BeneficiaryName}
          saveText={(text) => setBenfName(text)}
        />
        <AppEditText
          value={bankName}
          hint={Languages.BankName}
          saveText={(text) => setBankName(text)}
        />
        <AppButton
          name={Languages.AddNewBank}
          containerStyle={CommonStyles.appBtn}
          _handleOnPress={_handlenavigate}
          disabled={loader}
        />
      </View>
      <SnackBar
        visible={snackbar.isShow}
        onDismissSnackBar={onDismissSnackBar}
        msg={snackbar.msg}
      />
    </View>
  );
};

export default AddBankScreen;
