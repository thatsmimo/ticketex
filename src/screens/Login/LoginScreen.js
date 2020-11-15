import React, { useContext, useState } from "react";
import { View, Image, Text, TextInput } from "react-native";
import { AppHeader, AppEditText, AppButton } from "../../components";
import { I18nManager } from "react-native";

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
import { notify, APP_DEFAULTS, APP_KEYS } from "../../utils";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
//9578541854
const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);

  const [mobile, setMobile] = useState("9578541854");
  const [otp, setOtp] = useState("");
  const [isOtpMode, setOtpMode] = useState(false);
  const insets = useSafeAreaInsets();

  const [countryCode, setCountryCode] = useState(APP_DEFAULTS.countryCode);
  const [callingCode, setCallingCode] = useState(APP_DEFAULTS.callingCode);
  const [loader, setLoader] = useState(false);

  const _onSelectCountry = (country) => {
    // console.log("country: ", country);
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0] || "");
  };

  const _handleLogin = async () => {
    if (isOtpMode) {
      _authOtpAndLogin();
      return;
    }
    _getMobileOtp();
  };

  const _getMobileOtp = async () => {
    if (mobile === "") {
      notify(Languages.EnterMobNumber);
      return;
    }
    setLoader(true);
    const response = await Api.get(
      `users/login?mobile=${"+" + callingCode + mobile}`
    );
    console.log("res: ", response);
    if (response.status) {
      setOtpMode(true);
    } else {
      notify(Languages.SomethingWentWrong);
    }
    setLoader(false);
  };

  const _authOtpAndLogin = async () => {
    setLoader(true);
    const params = {
      grant_type: "password",
      client_id: 9,
      client_secret: APP_KEYS.oAuthClientSecret,
      username: callingCode + mobile,
      password: otp,
      scope: "",
    };
    const tokenRes = await Api.postOAuth(params);
    console.log("tokenRes: ", tokenRes);
    if (tokenRes.error) {
      notify(tokenRes.message);
      setLoader(false);
      return;
    }
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
                marginTop: 50,
                flexDirection: "row",
                borderRadius: 45 / 2,
                padding: 6,
                paddingLeft: 10,
                borderColor: Colors.lineColor,
                borderWidth: 0.5,
              }}
            >
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                withEmoji
                onSelect={_onSelectCountry}
                containerButtonStyle={{ paddingRight: 0, marginLeft: 0 }}
              />
              <TextInput
                style={{
                  fontSize: 15,
                  fontFamily: "regular",
                  color: "#1d1d1d",
                }}
                textAlign={!I18nManager.isRTL ? "left" : "right"}
                maxLength={13}
                value={mobile}
                placeholder={Languages.MobileNo}
                keyboardType="number-pad"
                onChangeText={(t) => setMobile(t.trim())}
              />
            </View>
          </>
        ) : (
          <AppEditText
            containerStyle={CommonStyles.marginTop50}
            hint={Languages.OTP_Number}
            saveText={(t) => setOtp(t)}
            maxLength={4}
            keyboardType="number-pad"
          />
        )}
        <View style={{ flexDirection: "row" }}>
          {isOtpMode && (
            <TouchableOpacity
              onPress={() => setOtpMode(false)}
              style={{
                height: 45,
                width: 70,
                alignItems: "center",
                borderRadius: 45 / 2,
                marginTop: 20,
                backgroundColor: Colors.primary,
                elevation: 5,
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Ionicons
                name={IconDir.Ionicons.back}
                size={25}
                color={Colors.background}
              />
            </TouchableOpacity>
          )}
          <AppButton
            _handleOnPress={_handleLogin}
            name={Languages.Login}
            containerStyle={{
              flex: 1,
            }}
            disabled={loader}
          />
        </View>
        {isOtpMode && (
          <Text onPress={_getMobileOtp} style={styles.resendOtp}>
            {Languages.ResendOTPNumber}
          </Text>
        )}
      </View>
    </View>
  );
};
export default LoginScreen;
