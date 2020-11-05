import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Colors, CommonStyles } from "../../js/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "../../components";

export default function ScanQRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log("data: ", data);
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
        Requesting for camera permission
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
        No access to camera
      </Text>
    );
  }

  return (
    <View style={[CommonStyles.screensRootContainer(insets.top)]}>
      <AppHeader title={"Scan QR"} navigation={navigation} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            height: "80%",
            borderColor: "white",
            borderWidth: 2,
            width: "80%",
            borderRadius: 10,
          }}
        />
      </View>
      {!scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={{
            height: 45,
            width: "70%",
            marginTop: 10,
            backgroundColor: Colors.primary,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 30,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "regular",
              color: Colors.background,
              textAlign: "center",
            }}
          >
            Tap to scan again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
