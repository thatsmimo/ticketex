/**
 * Tab 4 list -> selected item details
 */
import React from "react";
import {
  View,
  Text,
  Image,
  I18nManager,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { AppHeader, Separator } from "../../components";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import QRCode from "react-native-qrcode-svg";
import { APP_DEFAULTS, globalDateFormatter, imgBaseUrl } from "../../utils";

const PurchasedTicketDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { ticketDetails } = route.params;

  const _handleOpenMapsApp = () => {
    const location = `${ticketDetails.ticket_json.event.lat},${ticketDetails.ticket_json.event.lng}`;
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=100`,
    });
    try {
      Linking.openURL(url);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={CommonStyles.screensRootContainer(insets.top)}>
        <AppHeader title={Languages.TicketDetails} navigation={navigation} />
        <View style={styles.container}>
          <View style={CommonStyles.cardNoBg}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri: imgBaseUrl + ticketDetails.ticket_json.event.image_name,
                }}
                style={{ height: 117, width: 117, borderRadius: 8 }}
              />
              <View style={{ paddingLeft: 10, flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={styles.cardDetailsTitle}>
                    {ticketDetails.ticket_json.event.name}
                  </Text>
                  <Separator height={10} />
                  <Text style={CommonStyles.dateTxt}>
                    {globalDateFormatter(ticketDetails.ticket_json.event.start)}
                  </Text>
                  <Separator height={10} />
                  <Text style={CommonStyles.dateTxt}>
                    {ticketDetails.ticket_json.event.location}
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
                  {ticketDetails.price} {APP_DEFAULTS.currency}
                </Text>
              </View>
            </View>
          </View>

          <Separator height={20} />
          <View style={CommonStyles.cardNoBg}>
            <MapView
              initialRegion={{
                latitude: parseFloat(ticketDetails.ticket_json.event.lat),
                longitude: parseFloat(ticketDetails.ticket_json.event.lng),
                latitudeDelta: 0.00121,
                longitudeDelta: 0.00121,
              }}
              style={{ height: 117, width: "100%", alignSelf: "center" }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(ticketDetails.ticket_json.event.lat),
                  longitude: parseFloat(ticketDetails.ticket_json.event.lng),
                }}
                title={ticketDetails.ticket_json.event.location}
              />
            </MapView>
            <TouchableOpacity onPress={_handleOpenMapsApp}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  fontFamily: "regular",
                }}
              >
                {Languages.OpenOnGoogleMaps}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: Colors.lineColor,
              fontFamily: "regular",
              marginVertical: 10,
              textAlign: I18nManager.isRTL ? "left" : "left",
            }}
          >
            {Languages.ScanQR}
          </Text>
          {ticketDetails.ticket_json.offer_qty.map((e, i) => (
            <View key={i} style={CommonStyles.cardNoBg}>
              <View style={{ alignItems: "center" }}>
                {e.barcode && <QRCode value={String(e.barcode)} size={150} />}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PurchasedTicketDetailsScreen;
