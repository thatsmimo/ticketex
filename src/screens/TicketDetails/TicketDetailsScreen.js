import React from "react";
import { View, Text, Image, I18nManager, Platform } from "react-native";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
import { Separator, AppButton } from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { APP_DEFAULTS, globalDateFormatter, imgBaseUrl } from "../../utils";

const TicketDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const {
    eventDetails,
    availableTicketLength,
    soldTicketLength,
    sub_cat_name,
    city,
  } = route.params;

  return (
    <>
      <View style={{ paddingTop: Platform.OS === "android" ? insets.top : 0 }}>
        <StatusBar translucent style={"dark"} />
        {Platform.OS === "android" && (
          <View
            style={{
              height: Constants.statusBarHeight,
              backgroundColor: "rgba(255,255,255,.5)",
              position: "absolute",
              zIndex: 9,
              left: 0,
              right: 0,
            }}
          />
        )}
        <Image
          source={{ uri: imgBaseUrl + eventDetails.image_name }}
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
          <Text style={styles.headerBigTxt}>{eventDetails.name}</Text>
        </View>
        <View style={styles.headerBtmContainer}>
          <View style={styles.headerOpacityContainer}>
            <Text style={styles.whiteTxt13}>
              {Languages.Available} {availableTicketLength}
            </Text>
            <View style={styles.whiteSeparatorHorizontal} />
            <Text style={styles.whiteTxt13}>
              {Languages.Sold} {soldTicketLength}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.card(true)}>
        <View style={styles.rowAsContainer}>
          <Text style={styles.bodyHeaderTxt}>{eventDetails.name}</Text>
          {sub_cat_name ? (
            <View style={CommonStyles.mainChipContainer}>
              <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
                {sub_cat_name}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.rowAsContainer}>
          {eventDetails.end && (
            <Text style={CommonStyles.dateTxt}>
              {globalDateFormatter(eventDetails.end)}
            </Text>
          )}
          <Text style={CommonStyles.dateTxt}>{eventDetails.location}</Text>
          <Text style={CommonStyles.dateTxt}>{city}</Text>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={styles.extraTxt}>
            {Languages.OriginalSellingPrices} {eventDetails.org_price}{" "}
            {APP_DEFAULTS.currency}
          </Text>
        </View>
      </View>

      <View style={styles.card()}>
        <View style={{}}>
          <Text style={styles.itemIconTxt}>
            <Ionicons name={IconDir.Ionicons.user} />{" "}
            {eventDetails.offers.user.name}
          </Text>
          <Text style={styles.item2ndTxt}>
            {eventDetails.offers.sold_qty} {Languages.TicketsSold}
          </Text>
          <Separator />
          <Text style={styles.itemIconTxt}>
            {Languages.OneTicketFor} {eventDetails.offers.price}{" "}
            {APP_DEFAULTS.currency}
          </Text>
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
