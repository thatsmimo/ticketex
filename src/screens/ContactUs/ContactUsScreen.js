import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { notify } from "../../utils";
import Api from "../../js/service/api";

const ContactUsScreen = ({ navigation }) => {
  const [phn, setPhn] = useState("");
  const [msg, setMsg] = useState("");
  const insets = useSafeAreaInsets();

  const _handleOnPress = async () => {
    const phn_ = phn.trim();
    const msg_ = msg.trim();
    if (phn_ === "") {
      notify(Languages.EnterPhoneNo);
      return;
    }
    if (msg_ === "") {
      notify(Languages.EnterMessage);
      return;
    }
    const params = {
      mob: phn_,
      msg: msg_,
    };
    const response = await Api.post(`user/contact`, params);
    console.log("res: ", response);
    if (response.status) {
      notify(response.message);
    }
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.ContactUs} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={Assets.ic_contact}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTxt}>{Languages.ContactUs}</Text>
        <AppEditText
          value={phn}
          hint={Languages.PhoneNumber}
          saveText={(t) => setPhn(t)}
          keyBoardType="number-pad"
        />
        <AppEditText
          value={msg}
          hint={Languages.MessageHere}
          containerStyle={styles.msgEditTextContainer}
          multiline
          saveText={(t) => setMsg(t)}
        />
        <AppButton name={Languages.Send} _handleOnPress={_handleOnPress} />
      </View>
    </View>
  );
};

export default ContactUsScreen;
