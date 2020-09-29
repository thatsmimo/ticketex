import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText, Separator } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";
import { notify } from "../../utils";

const AddCreditCardScreen = ({ navigation }) => {
  const [card_no, setCard_no] = useState("");
  const [holder_name, setHolder_name] = useState("");
  const [cvv, setCvv] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");

  const cardValidation = (value) => {
    let Exp = /[0-9]{16}/;
    if (Exp.test(value)) {
      return 1;
    } else {
      return 0;
    }
  };
  const cvvValidation = (value) => {
    let Exp = /[0-9]{3}/;
    if (Exp.test(value)) {
      return 1;
    } else {
      return 0;
    }
  };
  const nameValidation = (value) => {
    let Exp = /[a-zA-Z ]/;
    if (Exp.test(value)) {
      return 1;
    } else {
      return 0;
    }
  };
  const expireValidation = (value) => {
    let Exp = /[0-9]{7}/;
    if (Exp.test(value)) {
      return 1;
    } else {
      return 0;
    }
  };

  const insets = useSafeAreaInsets();
  const _handleNavigate = async () => {
    // if ( cardValidation(card_no) && nameValidation(holder_name) && cvvValidation(cvv) && expireValidation(expire)) {
    if (card_no === "") {
      notify("Please enter card number.");
      return;
    }
    if (holder_name === "") {
      notify("Please enter card holder name.");
      return;
    }
    if (cvv === "") {
      notify("Please enter cvv.");
      return;
    }
    if (expireMonth === "") {
      notify("Please enter expire month.");
      return;
    }
    if (expireYear === "") {
      notify("Please enter expire year.");
      return;
    }
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
      notify(cardDetails.message);
    }
    // }
  };
  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddNewCreditCard} navigation={navigation} />
      <View style={styles.container}>
        <Image source={Assets.ic_cc} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTxt}>{Languages.AddNewCreditCard}</Text>
        <AppEditText
          hint={Languages.CardNumber}
          keyBoardType='numeric'
          saveText={(text) => setCard_no(text)}
        />
        <AppEditText
          hint={Languages.CardHolderName}
          saveText={(text) => setHolder_name(text)}
        />
        <View style={{ flexDirection: "row" }}>
          <AppEditText
            hint={Languages.CVV}
            keyBoardType='numeric'
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setCvv(text)}
          />
          <Separator width={10} />
          <AppEditText
            hint={"Expire Month"}
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setExpireMonth(text)}
          />
          <Separator width={10} />
          <AppEditText
            hint={"Expire Year"}
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setExpireYear(text)}
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
