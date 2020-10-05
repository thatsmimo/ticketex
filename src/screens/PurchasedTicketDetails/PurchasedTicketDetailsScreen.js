import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  I18nManager,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import Api from "../../js/service/api";

const PurchasedTicketDetailsScreen = ({ navigation, route }) => {
  const [listDetails, setListDetails] = useState();
  const insets = useSafeAreaInsets();
  const ticketId = route.params;
  console.log(ticketId);

  useEffect(() => {
    purchasedListDetails();
  }, []);

  const purchasedListDetails = async () => {
    const response = await Api.get("ticket/detail?id=" + ticketId);
    if (response.status) {
      setListDetails(response.ticket);
    }
    console.log(listDetails);
  };

  const _handleOpenMapsApp = () => {
    const location = `${listDetails.lat},${listDetails.lng}`;
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=100`,
    });
    Linking.openURL(url);
  };

  const Details = () => {
    if (listDetails) {
      return (
        <View style={CommonStyles.screensRootContainer(insets.top)}>
          <AppHeader title={Languages.TicketDetails} navigation={navigation} />
          <View style={styles.container}>
            <View style={CommonStyles.cardNoBg}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: listDetails.image_url }}
                  style={{ height: 117, width: 117, borderRadius: 8 }}
                />
                <View style={{ paddingLeft: 10, flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.cardDetailsTitle}>
                      {listDetails.name}
                    </Text>
                    <Separator height={10} />
                    <Text style={CommonStyles.dateTxt}>{listDetails.date}</Text>
                    <Separator height={10} />
                    <Text style={CommonStyles.dateTxt}>
                      {listDetails.location}
                    </Text>
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
                    {listDetails.price} SAR
                  </Text>
                </View>
              </View>
            </View>

            <Separator height={20} />
            <TouchableOpacity onPress={_handleOpenMapsApp}>
              <View style={CommonStyles.cardNoBg}>
                {/* <Image
              source={require("../../../assets/images/gmap.jpeg")}
              style={{ height: 117, width: "100%", alignSelf: "center" }}
              resizeMode="cover"
            /> */}

                <MapView
                  initialRegion={{
                    latitude: parseFloat(listDetails.lat),
                    longitude: parseFloat(listDetails.lng),
                    latitudeDelta: 0.00121,
                    longitudeDelta: 0.00121,
                  }}
                  style={{ height: 117, width: "100%", alignSelf: "center" }}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(listDetails.lat),
                      longitude: parseFloat(listDetails.lng),
                    }}
                    title={listDetails.location}
                  />
                </MapView>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 5,
                    fontFamily: "regular",
                  }}
                >
                  {Languages.OpenOnGoogleMaps}
                </Text>
              </View>
            </TouchableOpacity>
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
    } else {
      return <></>;
    }
  };
  return <Details />;
};

export default PurchasedTicketDetailsScreen;
