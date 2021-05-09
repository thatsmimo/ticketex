import React, { useState } from "react";
import { View, Text, Keyboard, I18nManager } from "react-native";
import { AppHeader, AppButton, AppEditText, SnackBar } from "../../components";
import { Languages, CommonStyles, Colors } from "../../js/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isValidIBANNumber, showAlert } from "../../utils";
import Api from "../../js/service/api";

const FieldHeader = ({ name, containerStyle }) => (
  //check
  <Text
    style={{
      fontFamily: "semi",
      marginTop: 20,
      marginBottom: 5,
      color: Colors.text,
      textAlign: I18nManager.isRTL ? "left" : "left",
      ...containerStyle,
    }}
  >
    {name}
  </Text>
);

const WithdrawScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [iban, setIban] = useState("");
  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

  const _handleOnPress = async () => {
    Keyboard.dismiss();
    if (iban === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterYourBankIban });
      return;
    }
    if (isValidIBANNumber(iban) !== 1) {
      setSnackBar({ isShow: true, msg: Languages.EnterValidIban });
      return;
    }
    if (name === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterName });
      return;
    }
    if (address === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterAddress });
      return;
    }
    setLoader(true);
    const params = {
      name: name,
      accountId: iban,
      address: address,
    };
    const withdrawBalance = await Api.post("withdrawBalance", params);
    console.log(withdrawBalance);
    showAlert(
      withdrawBalance.status ? Languages.Success : Languages.Sorry,
      withdrawBalance.message,
      backWhenDone
    );
    setLoader(false);
  };

  const backWhenDone = () => navigation.navigate("Balance", { isAdded: true });

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.WithdrawBalance} navigation={navigation} />
      <View style={{ paddingHorizontal: 30 }}>
        <FieldHeader name={Languages.IBAN + ":"} />
        <AppEditText
          value={iban}
          containerStyle={{
            marginTop: 0,
          }}
          hint={Languages.IBAN}
          saveText={(t) => setIban(t)}
        />
        <FieldHeader name={Languages.Name + ":"} />
        <AppEditText
          value={name}
          containerStyle={{
            marginTop: 0,
          }}
          hint={Languages.Name}
          saveText={(t) => setName(t)}
        />
        <FieldHeader name={Languages.Address + ":"} />
        <AppEditText
          value={address}
          containerStyle={{
            marginTop: 0,
          }}
          hint={Languages.Address}
          saveText={(t) => setAddress(t)}
        />
        <AppButton
          name={Languages.WithdrawBalance}
          containerStyle={{ marginTop: 20, marginBottom: 40 }}
          _handleOnPress={_handleOnPress}
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

export default WithdrawScreen;
