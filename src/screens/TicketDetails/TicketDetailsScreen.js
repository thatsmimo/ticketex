import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  I18nManager,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
import { Separator, AppButton, FieldHeader } from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import {
  APP_DEFAULTS,
  globalDateFormatter,
  imgBaseUrl,
  showAlert,
  returnPaymentGatewayHtml,
  PAYMENT_META_DATA,
  textGenerate,
  numberGenerate,
} from "../../utils";
import { WebView } from "react-native-webview";
import Api from "../../js/service/api";
import { BottomSheet } from "react-native-btr";

const TicketDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [htmlToRender, setHtmlToRender] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isvSheetVisible, setSheetVisible] = useState(false);
  const [qtyErrorTxt, setQtyErrorTxt] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [flagHit, setFlagHit] = useState(false);
  console.log("route.params: ", route.params);
  const {
    eventDetails,
    // availableTicketLength,
    // soldTicketLength,
    sub_cat_name,
    city,
    ticketStatus,
  } = route.params;
  const maxQty = eventDetails.offers.qty;

  const toggleBottomNavigationView = () => {
    setSheetVisible(!isvSheetVisible);
    setLoader(false);
  };

  const _handleInitPayment = async () => {
    if (quantity == 0) {
      setQtyErrorTxt(Languages.PleaseSelectQuantity);
      return;
    }
    setLoader(true);
    const givenName = textGenerate(5).toLowerCase();
    const surname = textGenerate(4).toLowerCase();
    const email = givenName + surname + numberGenerate(2) + "@gmail.com";

    const params = {
      ticket_id: eventDetails.offers.id,
      qty: quantity,
      ...PAYMENT_META_DATA.address,
      givenName,
      surname,
      email,
    };
    const response = await Api.post("payment/create", params);
    console.log("response: ", response);
    if (response.status) {
      setMerchantId(response.merchantTransactionId);
      setHtmlToRender(
        returnPaymentGatewayHtml(
          PAYMENT_META_DATA.locale,
          response.data.id,
          PAYMENT_META_DATA.method
        )
      );
      setOpenModal(true);
    } else {
      showAlert(Languages.Sorry, response.message, backWhenDone);
    }
  };

  const _handleQuantity = (type) => {
    let orgQuantity = quantity;
    switch (type) {
      case "-":
        // level condition
        if (orgQuantity == 0) return;
        orgQuantity--;
        setQuantity(orgQuantity);
        if (orgQuantity !== maxQty && qtyErrorTxt !== "") setQtyErrorTxt("");
        break;
      case "+":
        // level condition
        if (orgQuantity == maxQty) {
          setQtyErrorTxt(Languages.QuantityWarn + maxQty);
        } else orgQuantity++;
        setQuantity(orgQuantity);
        break;
      default:
        break;
    }
  };

  const _onNavigationStateChange = async (status) => {
    const { url } = status;
    if (url.indexOf(PAYMENT_META_DATA.returnUrl) != -1) {
      if (url.indexOf("id") != -1) {
        if (!flagHit) {
          setFlagHit(true);
          const response = await Api.post("payment/confirmPayment", {
            merchantTransactionId: merchantId,
          });
          console.log("check payment response", response);
          confirmAfterPayment(response);
        }
      } else {
        setLoader(false);
        // something eror
      }
    }
  };

  const confirmAfterPayment = ({ status, message }) => {
    setOpenModal(false);
    setLoader(false);
    setFlagHit(false);

    showAlert(
      status ? Languages.Congratulation : Languages.Sorry,
      message,
      backWhenDone
    );
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoader(false);
  };

  const backWhenDone = () => {
    navigation.navigate("Ticket", { isPayment: true });
  };

  return (
    <>
      <View>
        <View
          style={{ paddingTop: Platform.OS === "android" ? insets.top : 0 }}
        >
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
                {Languages.Available} {ticketStatus.available}
              </Text>
              <View style={styles.whiteSeparatorHorizontal} />
              <Text style={styles.whiteTxt13}>
                {Languages.Sold} {ticketStatus.sold}
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
            <Text style={CommonStyles.dateTxt}>
              {globalDateFormatter(eventDetails?.start)} -{" "}
              {globalDateFormatter(eventDetails?.end)}
            </Text>
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
          <View>
            <Text style={styles.itemIconTxt}>
              <Ionicons name={IconDir.Ionicons.user} />{" "}
              {eventDetails?.offers?.name}
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
          {eventDetails.offers.status == "a" && (
            <View
              style={{
                width: "90%",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <AppButton
                name={Languages.BuyNow}
                _handleOnPress={toggleBottomNavigationView}
                disabled={loader}
              />
            </View>
          )}
        </View>
      </View>
      <BottomSheet
        visible={isvSheetVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: openModal ? "90%" : 250,
            padding: 20,
          }}
        >
          <>
            {openModal ? (
              <>
                <View
                  style={{
                    marginTop: 30,
                    flex: 1,
                  }}
                >
                  <WebView
                    startInLoadingState
                    style={styles.webView}
                    incognito
                    source={{ html: htmlToRender }}
                    userAgent={PAYMENT_META_DATA.userAgentAndroid}
                    onNavigationStateChange={(status) =>
                      _onNavigationStateChange(status)
                    }
                    scalesPageToFit
                  />
                </View>

                <TouchableOpacity
                  onPress={hideModal}
                  style={{
                    position: "absolute",
                    zIndex: 9,
                    top: 20,
                    right: 20,
                  }}
                >
                  <Ionicons
                    name={IconDir.Ionicons.close}
                    style={{ color: Colors.accent }}
                    size={25}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <FieldHeader name={Languages.SelectQuantity} />
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => _handleQuantity("-")}
                    style={styles.quantityDecreaseContainer}
                  >
                    <Text style={styles.quantityTextContainer}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.quantityShowContainer}>
                    <Text style={styles.quantityTextContainer}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => _handleQuantity("+")}
                    style={styles.quantityIncreaseContainer}
                  >
                    <Text style={styles.quantityTextContainer}>+</Text>
                  </TouchableOpacity>
                </View>
                <FieldHeader
                  containerStyle={{ color: Colors.negative }}
                  name={qtyErrorTxt}
                />
                <AppButton
                  name={Languages.Proceed}
                  _handleOnPress={_handleInitPayment}
                  disabled={loader}
                />
              </>
            )}
          </>
        </View>
      </BottomSheet>
    </>
  );
};

export default TicketDetailsScreen;
