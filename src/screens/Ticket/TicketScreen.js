import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, I18nManager } from "react-native";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import Api from "../../js/service/api";
import { globalDateFormatter, imgBaseUrl } from "../../utils";

const TicketScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [eventDetails, setEventDetails] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    const response = await Api.get("events/details/" + route.params);
    console.log("event details: ", response);
    setLoader(false);
    if (response.status) {
      setEventDetails(response.events);
    }
  };

  const _handleShowMore = (selectedItem) => {
    navigation.navigate("TicketDetails", {
      eventDetails: { ...eventDetails, offers: selectedItem },
    });
  };

  const renderList = ({ item }) => (
    <View style={styles.card()}>
      <View style={styles.rowAsContainer}>
        {/* TODO status wise filter*/}
        <Text style={styles.itemHeaderTxt}>{Languages.AvailableTickets}</Text>
        <Text
          onPress={() => _handleShowMore(item)}
          style={styles.itemShowMoreTxt}
        >
          {Languages.ShowMore}
        </Text>
      </View>
      {/* List */}
      <>
        <View style={styles.rowAsContainer}>
          <Text style={styles.itemBodyTxt}>
            {item.qty} X {item.ticket_desc}
          </Text>
          <Text style={styles.itemBodyTxt}>{item.price} SAR / Ticket</Text>
        </View>
        <Text style={styles.itemIconTxt}>
          <Ionicons name={IconDir.Ionicons.user} /> {item.user.name}
        </Text>
      </>
      <View style={styles.itemSeparatorHorizontal} />
    </View>
  );

  return (
    <>
      <View style={{ paddingTop: insets.top }}>
        <StatusBar translucent style={"dark"} />
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
            <Text style={styles.whiteTxt13}>{Languages.Available} 3</Text>
            <View style={styles.whiteSeparatorHorizontal} />
            <Text style={styles.whiteTxt13}>{Languages.Sold} 1</Text>
          </View>
        </View>
      </View>

      <View style={styles.card(true)}>
        <View style={styles.rowAsContainer}>
          <Text style={styles.bodyHeaderTxt}>{eventDetails.name}</Text>
          <View style={CommonStyles.mainChipContainer}>
            <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
              King Cup
            </Text>
          </View>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={CommonStyles.dateTxt}>
            {globalDateFormatter(eventDetails.start)}
          </Text>
          <Text style={CommonStyles.dateTxt}>{eventDetails.location}</Text>
          <Text style={CommonStyles.dateTxt}>Riyadh</Text>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={styles.extraTxt}>
            {Languages.OriginalSellingPrices} {eventDetails.org_price} SAR
          </Text>
        </View>
      </View>

      <FlatList
        data={eventDetails.offers}
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
