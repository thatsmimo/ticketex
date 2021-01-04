import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { AppHeader, AppButton, AppEditText, SnackBar } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { isValidIBANNumber, showAlert, validateName } from "../../utils";

const AddBankScreen = ({ navigation }) => {
  const [iban, setIban] = useState("");
  const [benfName, setBenfName] = useState("");
  const [bankName, setBankName] = useState("");
  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

  const insets = useSafeAreaInsets();
  const [loader, setLoader] = useState(false);

  const _handleNav = async () => {
    Keyboard.dismiss();
    if (iban === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterYourBankIban });
      return;
    }
    if (isValidIBANNumber(iban) !== 1) {
      setSnackBar({ isShow: true, msg: Languages.EnterValidIban });
      return;
    }
    if (benfName === "") {
      setSnackBar({
        isShow: true,
        msg: Languages.EnterYourBankBeneficiaryName,
      });
      return;
    }
    if (!validateName(benfName)) {
      setSnackBar({
        isShow: true,
        msg: Languages.EnterValidBenf,
      });
      return;
    }
    if (bankName === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterYourBankName });
      return;
    }
    if (!validateName(bankName)) {
      setSnackBar({
        isShow: true,
        msg: Languages.EnterValidBank,
      });
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
    showAlert(
      bankDetails.status ? Languages.Success : Languages.Sorry,
      bankDetails.message,
      backWhenDone
    );
    setLoader(false);
  };

  const backWhenDone = () => navigation.navigate("Bank", { isAdded: true });

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddBankAccount} navigation={navigation} />
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "position" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
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
              _handleOnPress={_handleNav}
              disabled={loader}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <SnackBar
        visible={snackbar.isShow}
        onDismissSnackBar={onDismissSnackBar}
        msg={snackbar.msg}
      />
    </View>
  );
};

export default AddBankScreen;
