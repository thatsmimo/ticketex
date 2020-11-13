import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Assets, CommonStyles, Colors } from "../../js/common";
import { List } from "react-native-paper";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const FaqScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [faqList, setFaqList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getFAQs();
  }, []);

  const getFAQs = async () => {
    setLoader(true);
    const response = await Api.get("faq");
    if (response.status) {
      setFaqList(response.data);
    }
    setLoader(false);
  };

  const renderList = ({ item }) => (
    <View
      style={{
        backgroundColor: Colors.background,
        // borderWidth: 0.3,
        borderRadius: 8,
        elevation: 2,
      }}
    >
      <List.Accordion title={item.qq} titleStyle={styles.bodyHeader}>
        <Text style={styles.bodyTxt}>
          {item.ans} dbsbd hsvdfsd fs for(let s fs f s f s in object) {}
        </Text>
      </List.Accordion>
    </View>
  );

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.FAQs} navigation={navigation} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={faqList}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={loader}
          onRefresh={getFAQs}
          ListHeaderComponent={
            <View style={styles.innerContainer}>
              <Image
                source={Assets.ic_faq}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoTxt}>{Languages.FAQs}</Text>
              <Separator />
            </View>
          }
          ListFooterComponent={<Separator />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>
    </View>
  );
};

export default FaqScreen;
