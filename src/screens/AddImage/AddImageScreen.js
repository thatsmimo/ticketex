import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AppHeader, AppButton, AppEditText } from "../../components";
import styles from "./styles";

export default function AddImage({navigation, route}) {
  const _handleScanQrCode = () => navigation.navigate("CameraScreen");
  // const _handleQrCode =()=> navigation.navigate("ScanQr");
  const data = route.params;
  // console.log(data.uri)

  const CapturedImage = ()=>{
    if (data == null){
      return(<Image source={require('../../../assets/images/qr.png')} style={styles.captureImage} />)
    }
    else {
      console.log(data.uri)
      return(
        <Image source={data.uri} style={styles.captureImage} />
      )
    }
  }


  return (
    <View>
      <AppHeader title="camera" />
      <View style={styles.container}>
        <Text>please scan or upload the ticket QR code</Text>
        <CapturedImage />
        <View style={styles.butt}>
          <AppButton name="scan QR code" _handleOnPress={_handleScanQrCode} />
          {/* <AppButton name="upload QR code" _handleOnPress={_handleQrCode} /> */}
        </View>
      </View>
    </View>
  );
}
