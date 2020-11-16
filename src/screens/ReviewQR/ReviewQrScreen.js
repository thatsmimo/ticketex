import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  I18nManager,
} from "react-native";
import { Colors, CommonStyles, Languages } from "../../js/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton, AppHeader, FeildHeader } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import Api from "../../js/service/api";
import { notify } from "../../utils";

const ScanQRScreen = ({ navigation, route }) => {
  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [willUpdateId, setWillUpdateId] = useState("");
  const insets = useSafeAreaInsets();
  const { scannedQrList, formData } = route.params;
  const [loader, setLoader] = useState(false);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    scannedQrList[willUpdateId] = data;
  };

  const _handleSubmit = () => {
    Alert.alert(
      "",
      Languages.AreYouSure,
      [{ text: Languages.Ok, onPress: _appendQrAndSubmit }],
      { cancelable: true }
    );
  };

  const _appendQrAndSubmit = async () => {
    setLoader(true);
    const params = {
      ...formData,
      barcode: scannedQrList,
    };
    console.log("params: ", params);
    const res = await Api.post("ticket/create", params);
    console.log(res);
    notify(res.message);
    if (res.status) {
      navigation.navigate("AddTicket", { isSubmitted: true });
    } else {
      setLoader(false);
    }
  };

  const renderScannedQrList = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            textDecorationLine: "underline",
            flex: 1,
            fontSize: 14,
            fontFamily: "regular",
            textAlign: I18nManager.isRTL ? "left" : "left",
          }}
        >
          {item}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setScannedData("scan");
            setScanned(false);
            _returnTypeUi();
            setWillUpdateId(index);
          }}
          style={{
            flexDirection: "row",
            height: 45,
            backgroundColor: Colors.lightBlue,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            borderRadius: 45 / 2,
          }}
        >
          <Ionicons size={20} name={"md-create"} color={Colors.primary} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "semi",
              color: Colors.lineColor,
              marginLeft: 8,
            }}
          >
            {Languages.Edit}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _returnTypeUi = () => {
    return (
      <>
        {scannedData === "scan" ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              ...StyleSheet.absoluteFillObject,
              top: 200,
              bottom: 30,
            }}
          />
        ) : (
          <View style={{ paddingHorizontal: 20 }}>
            <FeildHeader name={Languages.ScannedData} />
            <FlatList
              data={scannedQrList}
              renderItem={renderScannedQrList}
              keyExtractor={(item, index) => index.toString()}
            />
            <AppButton
              name={Languages.Submit}
              containerStyle={{
                width: 200,
                alignSelf: "center",
                marginTop: 50,
              }}
              _handleOnPress={_handleSubmit}
              disabled={loader}
            />
          </View>
        )}
        {scannedData !== "" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              ...StyleSheet.absoluteFillObject,
              top: 200,
              bottom: 30,
            }}
          >
            <View
              style={{
                height: "65%",
                borderColor: "white",
                borderWidth: 2,
                width: "60%",
                borderRadius: 10,
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={[CommonStyles.screensRootContainer(insets.top)]}>
      <AppHeader title={Languages.ReviewQr} navigation={navigation} />
      <FeildHeader
        name={Languages.ReviewTicketQR}
        containerStyle={{
          paddingHorizontal: 20,
          textAlign: I18nManager.isRTL ? "left" : "left",
        }}
      />
      {_returnTypeUi()}
    </View>
  );
};

export default ScanQRScreen;
