import React, { useContext, useState } from "react";
import { View, Image, Text } from "react-native";
import { AppHeader, AppEditText, AppButton } from "../../components";
import { Assets, Languages, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../js/context";
import Api from "../../js/service/api";
import { notify } from "../../utils";

const LoginScreen = () => {
  const [mobile, setMobile] = useState("9578541854");
  const [otp, setOtp] = useState("");
  const [isOtpMode, setOtpMode] = useState(false);

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
    const response = await Api.get(`users/login?mobile=${mobile}`);
    console.log("res: ", response);
    if (response.status) {
      setOtpMode(true);
      setOtp(response.otp);
    }
  };

  const _authOtpAndLogin = async () => {
    const params = {
      grant_type: "password",
      client_id: 9,
      client_secret: "NQKbFoKFXkLZh6AMkF7P4KiwRgE3wqhOHJzNyw5V",
      username: mobile,
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
          <AppEditText
            value={mobile}
            containerStyle={CommonStyles.marginTop50}
            hint={Languages.MobileNo}
            keyBoardType="number-pad"
            saveText={(t) => setMobile(t.trim())}
          />
        ) : (
          <AppEditText
            value={otp}
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
