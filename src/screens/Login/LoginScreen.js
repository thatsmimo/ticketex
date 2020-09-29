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
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpMode, setOtpMode] = useState(false);

  const insets = useSafeAreaInsets();
  const { signIn } = useContext(AuthContext);
  const userDetails = {
    isLogin: true,
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
      notify("Please enter your mobile number.");
      return;
    }
    if (mobile.length < 10) {
      notify("Please enter a valid mobile number.");
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
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
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
