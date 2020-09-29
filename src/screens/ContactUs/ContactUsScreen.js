import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ContactUsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

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
        <AppEditText hint={Languages.PhoneNumber} />
        <AppEditText
          hint={Languages.MessageHere}
          containerStyle={styles.msgEditTextContainer}
          multiline
        />
        <AppButton name={Languages.Send} containerStyle={CommonStyles.appBtn} />
      </View>
    </View>
  );
};

export default ContactUsScreen;
