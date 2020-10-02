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
    const header = {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
      "Content-Type": "form-data",
    };
    const bankDetails = await Api.post("account/create", params,header);
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
