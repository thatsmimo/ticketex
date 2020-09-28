import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FaqScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.FAQs} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={Assets.ic_faq}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTxt}>{Languages.FAQs}</Text>
        <Separator />
        <Text style={styles.bodyTxt}>
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here Data Here Data Here Data Here Data Here Data Here
          Data Here Data Here{" "}
        </Text>
      </View>
    </View>
  );
};

export default FaqScreen;
