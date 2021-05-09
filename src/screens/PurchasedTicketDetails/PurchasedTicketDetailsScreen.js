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
  const { event } = ticketDetails.ticket_json;

  const _handleOpenMapsApp = () => {
    const query = `${event.lat},${event.lng}?q=${event.location}`;
    const url = Platform.select({
      ios: `maps:${query}`,
      android: `geo:${query}`,
    });
    Linking.openURL(url);
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
                  uri: imgBaseUrl + event.image_name,
                }}
                style={{ height: 117, width: 117, borderRadius: 8 }}
              />
              <View style={{ paddingLeft: 10, flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={styles.cardDetailsTitle}>{event.name}</Text>
                  <Separator height={10} />
                  <Text style={CommonStyles.dateTxt}>
                    {globalDateFormatter(event.start)}
                  </Text>
                  <Separator height={10} />
                  <Text style={CommonStyles.dateTxt}>{event.location}</Text>
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
                latitude: parseFloat(event.lat),
                longitude: parseFloat(event.lng),
                latitudeDelta: 0.00121,
                longitudeDelta: 0.00121,
              }}
              style={{ height: 117, width: "100%", alignSelf: "center" }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(event.lat),
                  longitude: parseFloat(event.lng),
                }}
                title={event.location}
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
                {Languages.OpenOnMaps}
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
