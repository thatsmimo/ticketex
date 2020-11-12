import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Assets, CommonStyles } from "../../js/common";
import { List } from "react-native-paper";
import styles from "./styles";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Colors from "../../js/common/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../js/service/api";

const FaqScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [faqs, setFAQs] = useState([]);

  useEffect(() => {
    getFAQs();
  }, []);
  const getFAQs = async () => {
    const response = await Api.get("faq");
    if (response.status) {
      setFAQs(response.data);
    }
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.FAQs} navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={Assets.ic_faq}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoTxt}>{Languages.FAQs}</Text>
          <Separator />
        </View>
        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {faqs.map((item, index) => {
              return (
                <List.Accordion title={item.qq} titleStyle={styles.bodyHeader}>
                  <Text style={styles.bodyTxt}>{item.ans}</Text>
                </List.Accordion>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FaqScreen;
