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
    const header = {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
      "Content-Type": "form-data",
    };
    const cardDetails = await Api.post("card/create", params,header);
    console.log(cardDetails);
    // console.log(cardDetails);
    // if (cardDetails.status) {
    //   notify(cardDetails.message);
    // }
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
