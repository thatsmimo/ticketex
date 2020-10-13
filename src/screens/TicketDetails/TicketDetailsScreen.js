import React from "react";
import { View, Text, Image, I18nManager } from "react-native";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
import { Separator, AppButton } from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TicketDetailsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={{ paddingTop: insets.top }}>
        <StatusBar translucent style={"dark"} />
        <View
          style={{
            height: 25,
            backgroundColor: "rgba(255,255,255,.5)",
            position: "absolute",
            zIndex: 9,
            left: 0,
            right: 0,
          }}
        />
        <Image
          source={require("../../../assets/images/player.png")}
          style={styles.headerBigImg}
        />
        <View style={styles.headerTopContainer}>
          <IconButton
            icon={
              I18nManager.isRTL
                ? IconDir.MaterialCommunityIcons.arrowRight
                : IconDir.MaterialCommunityIcons.arrowLeft
            }
            color={Colors.background}
            size={40}
            onPress={navigation.goBack}
          />
          <Text style={styles.headerBigTxt}>ALHILAL vs ALNASSER</Text>
        </View>
        <View style={styles.headerBtmContainer}>
          <View style={styles.headerOpacityContainer}>
            <Text style={styles.whiteTxt13}>{Languages.Available} 3</Text>
            <View style={styles.whiteSeparatorHorizontal} />
            <Text style={styles.whiteTxt13}>{Languages.Sold} 1</Text>
          </View>
        </View>
      </View>

      <View style={styles.card(true)}>
        <View style={styles.rowAsContainer}>
          <Text style={styles.bodyHeaderTxt}>ALHILAL vs ALNASSER</Text>
          <View style={CommonStyles.mainChipContainer}>
            <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
              King Cup
            </Text>
          </View>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={CommonStyles.dateTxt}>SUN 3 NOVEMBER</Text>
          <Text style={CommonStyles.dateTxt}>King Fahad Studium</Text>
          <Text style={CommonStyles.dateTxt}>Riyadh</Text>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={styles.extraTxt}>
            {Languages.OriginalSellingPrices} 180 SAR
          </Text>
        </View>
      </View>

      <View style={styles.card()}>
        <View style={{}}>
          <Text style={styles.itemIconTxt}>
            <Ionicons name={IconDir.Ionicons.user} /> Khalid Mohamed
          </Text>
          <Text style={styles.item2ndTxt}>18 Tickets Sold</Text>
          <Separator />
          <Text style={styles.itemIconTxt}>1 Ticket for 200 SAR</Text>
          <Text style={styles.item2ndTxt}>{Languages.PriceIncludesFees}</Text>
        </View>
        <View style={styles.padding20}>
          <AppButton name={Languages.BuyNow} />
        </View>
      </View>
    </>
  );
};

export default TicketDetailsScreen;
