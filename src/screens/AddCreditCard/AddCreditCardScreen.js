import React, { useState } from "react";
import { View, Text, Image, I18nManager } from "react-native";
import {
  AppHeader,
  AppButton,
  AppEditText,
  Separator,
  SnackBar,
} from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const AddCreditCardScreen = ({ navigation }) => {
  const [card_no, setCard_no] = useState("");
  const [holder_name, setHolder_name] = useState("");
  const [cvv, setCvv] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [loader, setLoader] = useState(false);

  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

  const insets = useSafeAreaInsets();
  const _handleNavigate = async () => {
    if (card_no === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterCardNumber });
      return;
    }
    if (holder_name === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterCardHolderName });
      return;
    }
    if (cvv === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterCvv });
      return;
    }
    if (expireMonth === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterExpireMonth });
      return;
    }
    if (expireYear === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterExpireYear });
      return;
    }
    setLoader(true);
    const params = {
      cardNumber: card_no,
      holderName: holder_name,
      cvv: cvv,
      expireYear: expireYear,
      expireMonth: expireMonth,
    };
    const cardDetails = await Api.post("card/create", params);
    console.log(cardDetails);
    if (cardDetails.status) {
      setHolder_name("");
      setCvv("");
      setCard_no("");
      setExpireMonth("");
      setExpireYear("");
    }
    setSnackBar({ isShow: true, msg: cardDetails.message });
    setLoader(false);
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddNewCreditCard} navigation={navigation} />
      <View style={styles.container}>
        <Image source={Assets.ic_cc} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTxt}>{Languages.AddNewCreditCard}</Text>
        <AppEditText
          value={card_no}
          hint={Languages.CardNumber}
          keyBoardType="numeric"
          saveText={(text) => setCard_no(text)}
        />
        <AppEditText
          value={holder_name}
          hint={Languages.CardHolderName}
          saveText={(text) => setHolder_name(text)}
        />
        <View style={{ flexDirection: "row" }}>
          <AppEditText
            value={cvv}
            hint={Languages.CVV}
            keyBoardType="numeric"
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setCvv(text)}
          />
          <Separator width={10} />
          <AppEditText
            value={expireMonth}
            hint={Languages.ExpireMonth}
            keyBoardType="numeric"
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setExpireMonth(text)}
            maxLength={2}
          />
          <Separator width={10} />
          <AppEditText
            value={expireYear}
            hint={Languages.ExpireYear}
            keyBoardType="numeric"
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setExpireYear(text)}
            maxLength={4}
          />
        </View>
        <AppButton
          name={Languages.AddNewCreditCard}
          _handleOnPress={_handleNavigate}
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

export default AddCreditCardScreen;
