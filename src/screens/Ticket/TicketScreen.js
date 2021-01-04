import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  I18nManager,
  Platform,
} from "react-native";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import IconDir from "../../js/common/IconDir";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import Api from "../../js/service/api";
import { APP_DEFAULTS, globalDateFormatter, imgBaseUrl } from "../../utils";

const TicketScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [eventDetails, setEventDetails] = useState([]);
  const [loader, setLoader] = useState(true);
  const [ticketList, setTicketList] = useState([]);

  const [availableTicketLength, setAvailableTicketLength] = useState(0);
  const [soldTicketLength, setSoldTicketLength] = useState(0);

  const { selectedEventId } = route.params;

  useEffect(() => {
    if (route.params?.isPayment) {
      // when payment done
      fetchEventDetails();
    }
  }, [route, route.params?.isPayment]);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    const response = await Api.get("events/details/" + selectedEventId);
    console.log("event details: ", response);
    setLoader(false);
    if (response.status) {
      setEventDetails(response.events);
      sortTickets(response.events.offers);
    }
  };

  const _handleShowMore = (selectedItem) => {
    navigation.navigate("TicketDetails", {
      eventDetails: { ...eventDetails, offers: selectedItem },
      availableTicketLength: availableTicketLength,
      soldTicketLength: soldTicketLength,
      sub_cat_name: eventDetails.sub_cat_name,
      electedEventId: selectedEventId,
    });
  };

  const sortTickets = (ticketList) => {
    let availableArr = [],
      soldArr = [];
    ticketList.forEach((element) => {
      if (element.status == "s") {
        soldArr.push({ ...element });
      } else {
        availableArr.push({ ...element });
      }
    });
    setAvailableTicketLength(availableArr.length);
    setSoldTicketLength(soldArr.length);
    setTicketList([...availableArr, ...soldArr]);
  };

  const renderList = ({ item }) => (
    <View style={styles.card()}>
      <View style={styles.rowAsContainer}>
        <Text
          style={
            item.status == "a"
              ? styles.itemHeaderTxtAvailable
              : styles.itemHeaderTxtSold
          }
        >
          {item.status == "a"
            ? Languages.AvailableTickets
            : Languages.SoldTickets}
        </Text>
        {item.status == "a" && (
          <Text
            onPress={() => _handleShowMore(item)}
            style={styles.itemShowMoreTxt}
          >
            {Languages.ShowMore}
          </Text>
        )}
      </View>
      <>
        <View style={styles.rowAsContainer}>
          <Text style={styles.itemBodyTxt}>
            {item?.qty} X {item?.class_type.name}
          </Text>
          <Text style={styles.itemBodyTxt}>
            {item.price} {APP_DEFAULTS.currency} / {Languages.Ticket}
          </Text>
        </View>
        {/* <Text style={styles.itemIconTxt}>
          <Ionicons name={IconDir.Ionicons.user} /> {item?.user?.name}
        </Text> */}
      </>
      <View style={styles.itemSeparatorHorizontal} />
    </View>
  );

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
          // resizeMode="contain"
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
          <Text style={styles.headerBigTxt}>{eventDetails?.name}</Text>
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
          <Text style={styles.bodyHeaderTxt}>{eventDetails?.name}</Text>
          {eventDetails.sub_cat_name ? (
            <View style={CommonStyles.mainChipContainer}>
              <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
                {eventDetails.sub_cat_name}
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
          <Text style={CommonStyles.dateTxt}>{eventDetails?.city?.name}</Text>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={styles.extraTxt}>
            {Languages.OriginalSellingPrices} {eventDetails.org_price}{" "}
            {APP_DEFAULTS.currency}
          </Text>
        </View>
      </View>
      <FlatList
        data={ticketList}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={loader}
        onRefresh={() => fetchEventDetails()}
      />
    </>
  );
};

export default TicketScreen;
