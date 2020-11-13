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

  const insets = useSafeAreaInsets();
  const _handleNavigate = async () => {
    if (card_no === "") {
      notify("Enter card number.");
      return;
    }
    if (holder_name === "") {
      notify("Enter card holder name.");
      return;
    }
    if (cvv === "") {
      notify("Enter cvv.");
      return;
    }
    if (expireMonth === "") {
      notify("Enter expire month.");
      return;
    }
    if (expireYear === "") {
      notify("Enter expire year.");
      return;
    }
    const params = {
      cardNumber: card_no,
      holderName: holder_name,
      cvv: cvv,
      expireYear: expireYear,
      expireMonth: expireMonth,
    };
    // const formData = new FormData();
    // formData.append("cardNumber", card_no);
    // formData.append("holderName", holder_name);
    // formData.append("cvv", cvv);
    // formData.append("expireYear", expireYear);
    // formData.append("expireMonth", expireMonth);

    const cardDetails = await Api.post("card/create", params);
    console.log(cardDetails);
    if (cardDetails.status) {
      notify(cardDetails.message);
    }
  };
  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddNewCreditCard} navigation={navigation} />
      <View style={styles.container}>
        <Image source={Assets.ic_cc} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoTxt}>{Languages.AddNewCreditCard}</Text>
        <AppEditText
          hint={Languages.CardNumber}
          keyBoardType="numeric"
          saveText={(text) => setCard_no(text)}
        />
        <AppEditText
          hint={Languages.CardHolderName}
          saveText={(text) => setHolder_name(text)}
        />
        <View style={{ flexDirection: "row" }}>
          <AppEditText
            hint={Languages.CVV}
            keyBoardType="numeric"
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setCvv(text)}
          />
          <Separator width={10} />
          <AppEditText
            hint={"Expire Month"}
            keyBoardType="numeric"
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setExpireMonth(text)}
            maxLength={2}
          />
          <Separator width={10} />
          <AppEditText
            hint={"Expire Year"}
            keyBoardType="numeric"
            containerStyle={styles.editTxtExtra}
            saveText={(text) => setExpireYear(text)}
            maxLength={4}
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
