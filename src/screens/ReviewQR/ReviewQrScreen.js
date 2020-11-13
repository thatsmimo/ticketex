import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { Colors, CommonStyles, IconDir, Languages } from "../../js/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton, AppHeader, FeildHeader } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { notify } from "../../utils";
import Api from "../../js/service/api";
import QRCode from "react-native-qrcode-svg";

export default function ScanQRScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [image, setImage] = useState(null);

  const [willUpdateId, setWillUpdateId] = useState("");

  const [qrCount, setQRCount] = useState(0);

  const insets = useSafeAreaInsets();
  // scannedQrList.length = 0;

  console.log("====================================");
  console.log("data: ", JSON.stringify(scannedQrList));
  console.log("====================================");
  const { isScanQr, scannedQrList, formData } = route.params;
  const qrData = [];

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    scannedQrList[willUpdateId].data = data;
    console.log("data: ", scannedQrList[willUpdateId].data);
  };

  const _handleSubmit = () => {
    if (!isScanQr) {
      if (image === null) {
        notify(Languages.PleaseSelectImage);
        return;
      }
    }
    Alert.alert(
      "",
      Languages.AreYouSure,
      [{ text: Languages.Ok, onPress: _appendQrAndSubmit }],
      { cancelable: true }
    );
  };

  const _appendQrAndSubmit = async () => {
    const orgFormData = formData;
    if (isScanQr) {
      orgFormData.append("barcode", scannedQrList);
    } else {
      const filename = image.split("/").pop();
      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      orgFormData.append("image", { uri: image, name: filename, type });
    }
    console.log("dataset: ", orgFormData);

    // const response = await Api.upload("ticket/create", orgFormData);
    // console.log("response: ", response);

    if (true) {
      // clear all
      if (isScanQr) {
        setScannedData("");
        setScanned(false);
      } else {
        setImage(null);
      }
      navigation.navigate("AddTicket", { isSubmitted: true });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
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

  const renderScannedQrList = ({ item, index }) => {
    // console.log(scannedQrList);
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
          }}
        >
          {item.data}
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
            width: 100,
            backgroundColor: Colors.lightBlue,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            padding: 7,
            borderRadius: 20,
          }}
        >
          <Ionicons
            size={20}
            name={IconDir.Ionicons.add}
            color={Colors.primary}
          />
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
    if (isScanQr) {
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
                renderItem={({ item, index }) =>
                  renderScannedQrList({ item, index })
                }
                keyExtractor={(item, index) => index.toString()}
              />
              {/* Submit button */}

              <AppButton
                name={Languages.Submit}
                containerStyle={{
                  width: 200,
                  alignSelf: "center",
                  marginTop: 50,
                }}
                _handleOnPress={_handleSubmit}
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
    } else {
      return (
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              marginTop: 30,
              borderColor: Colors.lineColor,
              borderRadius: 8,
              borderWidth: 1,
              alignItems: "center",
              alignSelf: "center",
              height: 150,
              width: 150,
              justifyContent: "center",
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 140, height: 140 }}
              />
            ) : (
              <Ionicons
                name={IconDir.Ionicons.add}
                size={140}
                color={Colors.lineColor}
              />
            )}
          </TouchableOpacity>
          <AppButton
            name={Languages.Submit}
            containerStyle={{
              width: 200,
              alignSelf: "center",
              marginTop: 50,
            }}
            _handleOnPress={_handleSubmit}
          />
        </View>
      );
    }
  };

  return (
    <View style={[CommonStyles.screensRootContainer(insets.top)]}>
      <AppHeader
        title={`${isScanQr ? Languages.Scan : Languages.Upload} QR`}
        navigation={navigation}
      />
      <FeildHeader
        name={`Please Review the ticket QR Code`}
        containerStyle={{ paddingHorizontal: 20 }}
      />
      {_returnTypeUi()}
    </View>
  );
}
