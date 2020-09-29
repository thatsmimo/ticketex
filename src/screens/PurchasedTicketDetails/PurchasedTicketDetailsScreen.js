import React from "react";
import { View, Text, Image, I18nManager } from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PurchasedTicketDetailsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.TicketDetails} navigation={navigation} />
      <View style={styles.container}>
        <View style={CommonStyles.cardNoBg}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../assets/images/joker.jpg")}
              style={{ height: 117, width: 117, borderRadius: 8 }}
            />
            <View style={{ paddingLeft: 10, flex: 1 }}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.cardDetailsTitle}>JOKER MOVIE</Text>
                <Separator height={10} />
                <Text style={CommonStyles.dateTxt}>SUN 3 NOVEMBER</Text>
                <Separator height={10} />
                <Text style={CommonStyles.dateTxt}>The Roof</Text>
              </View>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: 15,
                  textAlign: "right",
                  marginTop: 10,
                  color: Colors.lineColor,
                  textAlign: I18nManager.isRTL ? "left" : "left",
                }}
              >
                350 SAR
              </Text>
            </View>
          </View>
        </View>

        <Separator height={20} />
        <View style={CommonStyles.cardNoBg}>
          <Image
            source={require("../../../assets/images/gmap.jpeg")}
            style={{ height: 117, width: "100%", alignSelf: "center" }}
            resizeMode="cover"
          />
          <Text
            style={{ textAlign: "center", marginTop: 5, fontFamily: "regular" }}
          >
            {Languages.OpenOnGoogleMaps}
          </Text>
        </View>
        <Text
          style={{
            color: Colors.lineColor,
            fontFamily: "regular",
            marginVertical: 10,
            textAlign: I18nManager.isRTL ? "left" : "left",
          }}
        >
          {Languages.OrYouCanScanQRCode}
        </Text>
        <View style={CommonStyles.cardNoBg}>
          <Image
            source={require("../../../assets/images/qr.png")}
            style={{ height: 290, width: "100%", alignSelf: "center" }}
            resizeMode="stretch"
          />
        </View>
      </View>
    </View>
  );
};

export default PurchasedTicketDetailsScreen;
