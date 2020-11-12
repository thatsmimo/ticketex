import React, { useContext, useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { AppHeader, AppEditText, AppButton } from "../../components";
import {
  Assets,
  Languages,
  CommonStyles,
  IconDir,
  Colors,
} from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../js/context";
import Api from "../../js/service/api";
import { notify } from "../../utils";
import { Ionicons } from "@expo/vector-icons";
import CountryPicker, {
  CountryModalProvider,
} from "react-native-country-picker-modal";

const LoginScreen = () => {
  const [mobile, setMobile] = useState("9578541854");
  const [otp, setOtp] = useState("");
  const [isOtpMode, setOtpMode] = useState(false);

  const [cca2, setCca2] = useState("IN");
  const [countryCode, setCountryCode] = useState("91");

  const [withModal, setWithModal] = useState(true);
  const [visible, setVisible] = useState(false);
  const switchVisible = () => setVisible(!visible);

  const insets = useSafeAreaInsets();
  const { signIn } = useContext(AuthContext);

  const _handleLogin = async () => {
    if (isOtpMode) {
      _authOtpAndLogin();
      return;
    }
    _getMobileOtp();
  };

  const _getMobileOtp = async () => {
    if (mobile === "") {
      notify("Enter your mobile number.");
      return;
    }
    if (mobile.length < 10) {
      notify("Enter a valid mobile number.");
      return;
    }
    const response = await Api.get(
      `users/login?mobile=${"+" + countryCode.toString() + mobile}`
    );
    console.log("res: ", response);
    if (response.status) {
      console.log(response.otp);
      setOtp(response.otp);
      setOtpMode(true);
    }
  };

  const _authOtpAndLogin = async () => {
    const params = {
      grant_type: "password",
      client_id: 9,
      client_secret: "NQKbFoKFXkLZh6AMkF7P4KiwRgE3wqhOHJzNyw5V",
      username: countryCode.toString() + mobile,
      password: otp,
      scope: "",
    };
    const tokenRes = await Api.postOAuth(params);
    console.log(tokenRes);
    const header = {
      Authorization: `${tokenRes.token_type} ${tokenRes.access_token}`,
      "Content-Type": "application/json",
    };
    const userDetailsRes = await Api.get("user/profile", null, header);
    console.log("userDetails: ", userDetailsRes);
    if (userDetailsRes.status) {
      signIn({
        userDetails: JSON.stringify(userDetailsRes.profile),
        tokens: JSON.stringify(tokenRes),
      });
    }
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader
        title={Languages.LoginToTicketex}
        desc={Languages.WelcomeAtLogin}
      />
      <View style={styles.container}>
        <Image
          source={Assets.logo_login}
          style={styles.logo}
          resizeMode="contain"
        />
        {!isOtpMode ? (
          <>
            <View
              style={{
                height: 45,
                marginTop: 30,
                flexDirection: "row",
                borderColor: "black",
                borderRadius: 45 / 2,
                borderWidth: 0.5,
                padding: 6,
                paddingLeft: 10,
              }}
            >
              {/* <View> */}
              {/* <CountryPicker
                  onSelect={(item) => {
                    setCountryCode("+" + item.callingCode[0].toString());
                    console.log("====================================");
                    console.log(item);
                    console.log("====================================");
                  }}
                  cca2={cca2}
                /> */}
              <CountryModalProvider>
                <CountryPicker
                  {...{
                    withModal,
                    modalProps: {
                      visible,
                    },
                    onClose: () => setVisible(false),
                    onOpen: () => setVisible(true),
                  }}
                  onSelect={(item) => {
                    setCountryCode(item.callingCode[0].toString());
                    console.log("====================================");
                    console.log(item.callingCode[0].toString());
                    console.log("====================================");
                  }}
                />
              </CountryModalProvider>
              <TouchableOpacity
                onPress={switchVisible}
                style={{
                  flexDirection: "row",
                  padding: 4,
                  paddingHorizontal: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "regular",
                    color: "#1d1d1d",
                    paddingVertical: 2,
                    paddingRight: 9,
                  }}
                >
                  {"+" + countryCode}
                </Text>
                <Ionicons
                  size={24}
                  name={IconDir.Ionicons.down}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TextInput
                style={{
                  paddingLeft: 6,
                  fontSize: 15,
                  fontFamily: "regular",
                  color: "#1d1d1d",
                }}
                value={mobile}
                placeholder={Languages.MobileNo}
                keyboardType="number-pad"
                onChangeText={(t) => setMobile(t.trim())}
              />
              {/* </View> */}
              {/* <AppEditText
                  value={mobile}
                  containerStyle={CommonStyles.marginTop50}
                  hint={Languages.MobileNo}
                  keyBoardType="number-pad"
                  saveText={(t) => setMobile(t.trim())}
                /> */}
            </View>
          </>
        ) : (
          <AppEditText
            value={otp.toString()}
            containerStyle={CommonStyles.marginTop50}
            hint={Languages.OTP_Number}
            saveText={(t) => setOtp(t)}
            maxLength={4}
          />
        )}
        <AppButton
          _handleOnPress={_handleLogin}
          name={Languages.Login}
          containerStyle={CommonStyles.appBtn}
        />
        {isOtpMode && (
          <Text style={styles.resendOtp}>{Languages.ResendOTPNumber}</Text>
        )}
      </View>
    </View>
  );
};
export default LoginScreen;
