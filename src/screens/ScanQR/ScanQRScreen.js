import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors, CommonStyles, Languages } from "../../js/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton, AppHeader, FeildHeader } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScanQRScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(route.params.scannedQrList || []);
  const [qrCount, setQRCount] = useState(0);
  const insets = useSafeAreaInsets();
  const { formData } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const _handleNavigation = () => {
    navigation.navigate("ReviewQr", {
      scannedQrList: qrData,
      formData,
    });
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    setQRCount(qrCount + 1);

    let orgQRData = [...qrData];
    orgQRData.push(data);
    setQrData(orgQRData);
    console.log("scanned data: ", data);
  };

  if (hasPermission === null) {
    return (
      <Text
        style={{
          fontSize: 16,
          fontFamily: "regular",
          color: Colors.text,
          textAlign: "center",
        }}
      >
        {Languages.RequestingForCameraPermissions}
      </Text>
    );
  }
  if (hasPermission === false) {
    return (
      <Text
        style={{
          fontSize: 16,
          fontFamily: "regular",
          color: Colors.text,
          textAlign: "center",
        }}
      >
        {Languages.NoAccessToCamera}
      </Text>
    );
  }

  const _returnTypeUi = () => {
    return (
      <>
        {scannedData === "" ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              ...StyleSheet.absoluteFillObject,
              top: 200,
              bottom: 30,
            }}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                borderWidth: 0.5,
                borderRadius: 20,
                height: 45,
                backgroundColor: Colors.lightBlue,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
              }}
            >
              <Ionicons name={"ios-barcode"} size={20} color={Colors.text} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "regular",
                  color: Colors.text,
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                {qrCount}
              </Text>
            </View>
            <AppButton
              name={
                qrCount < formData.qty ? Languages.ScanNext : Languages.ReviewQr
              }
              containerStyle={{
                width: 200,
                marginLeft: 10,
                marginTop: 0,
              }}
              _handleOnPress={
                qrCount < formData.qty
                  ? () => {
                      setScannedData("");
                      setScanned(false);
                      _returnTypeUi();
                    }
                  : _handleNavigation
              }
            />
          </View>
        )}
        {scannedData === "" && (
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
      <AppHeader title={Languages.ScanQR} navigation={navigation} />
      <FeildHeader
        name={Languages.ScanTicketQR}
        containerStyle={{ paddingHorizontal: 20 }}
      />
      {_returnTypeUi()}
    </View>
  );
};

export default ScanQRScreen;
