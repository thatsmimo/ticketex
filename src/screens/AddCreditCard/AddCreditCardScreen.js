import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { AppHeader, AppButton, SnackBar } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { CreditCardInput } from "react-native-credit-card-input";
import { showAlert, validateName } from "../../utils";

const AddCreditCardScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [picker, setPicker] = useState({
    status: {
      cvc: "incomplete",
      expiry: "incomplete",
      name: "incomplete",
      number: "incomplete",
      valid: false,
    },
    values: {
      cvc: "",
      expiry: "",
      name: "",
      number: "",
      type: undefined,
    },
    valid: false,
  });

  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

  const insets = useSafeAreaInsets();

  const _handleNavigate = async () => {
    Keyboard.dismiss();
    const { status, values, valid } = picker;
    if (status.number === "incomplete") {
      setSnackBar({ isShow: true, msg: Languages.CardNoIncomplete });
      return;
    }
    if (status.number === "invalid") {
      setSnackBar({ isShow: true, msg: Languages.CardNoNValid });
      return;
    }
    if (status.expiry === "incomplete") {
      setSnackBar({ isShow: true, msg: Languages.CardExpIncomplete });
      return;
    }
    if (status.expiry === "invalid") {
      setSnackBar({ isShow: true, msg: Languages.CardExpNValid });
      return;
    }
    if (status.cvc === "incomplete") {
      setSnackBar({ isShow: true, msg: Languages.CardCvvIncomplete });
      return;
    }
    if (status.cvc === "invalid") {
      setSnackBar({ isShow: true, msg: Languages.CardCvvNValid });
      return;
    }
    if (status.name === "incomplete") {
      setSnackBar({ isShow: true, msg: Languages.CardNameIncomplete });
      return;
    }
    if (!validateName(status.name)) {
      setSnackBar({ isShow: true, msg: Languages.CardNameNValid });
      return;
    }
    if (!valid) {
      setSnackBar({ isShow: true, msg: Languages.CardNValid });
      return;
    }

    setLoader(true);
    const expireMonth = values.expiry.slice(0, 2);
    const expireYear = values.expiry.slice(3, 5);
    const params = {
      cardNumber: values.number,
      holderName: values.name,
      cvv: values.cvc,
      expireYear,
      expireMonth,
    };
    const cardDetails = await Api.post("card/create", params);
    console.log(cardDetails);
    showAlert(
      cardDetails.status ? Languages.Success : Languages.Sorry,
      cardDetails.message,
      backWhenDone
    );
    setLoader(false);
  };

  const backWhenDone = () =>
    navigation.navigate("CreditCard", { isAdded: true });

  const _onChangeCreditCardInput = (input) => setPicker(input);

  return (
    <>
      <View style={CommonStyles.screensRootContainer(insets.top)}>
        <AppHeader title={Languages.AddNewCreditCard} navigation={navigation} />
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? -80 : 0}
          >
            <View
              style={{
                alignItems: "center",
                paddingVertical: 20,
                marginTop: Platform.OS === "ios" ? 60 : 0,
              }}
            >
              <Image
                source={Assets.ic_cc}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoTxt}>{Languages.AddNewCreditCard}</Text>
            </View>
            <CreditCardInput onChange={_onChangeCreditCardInput} requiresName />
            <AppButton
              name={Languages.AddNewCreditCard}
              _handleOnPress={_handleNavigate}
              disabled={loader}
              containerStyle={{
                width: 300,
                alignSelf: "center",
                marginBottom: 20,
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <SnackBar
          visible={snackbar.isShow}
          onDismissSnackBar={onDismissSnackBar}
          msg={snackbar.msg}
        />
      </View>
    </>
  );
};

export default AddCreditCardScreen;
