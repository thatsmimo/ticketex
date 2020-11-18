import React, { useState } from "react";
import { View, Text, Image, I18nManager } from "react-native";
import { AppHeader, AppButton, AppEditText, SnackBar } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const ContactUsScreen = ({ navigation }) => {
  const [phn, setPhn] = useState("");
  const [msg, setMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

  const insets = useSafeAreaInsets();

  const _handleOnPress = async () => {
    const phn_ = phn.trim();
    const msg_ = msg.trim();
    if (phn_ === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterPhoneNo });
      return;
    }
    if (msg_ === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterMessage });
      return;
    }
    setLoader(true);
    const params = {
      mob: phn_,
      msg: msg_,
    };
    const response = await Api.post(`user/contact`, params);
    console.log("res: ", response);
    setSnackBar({ isShow: true, msg: response.message });
    setLoader(false);
    if (response.status) {
      setMsg("");
      setPhn("");
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
        <AppButton
          name={Languages.Send}
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

export default ContactUsScreen;
