import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { AppHeader, AppButton, AppEditText } from "../../components";
import styles from "./styles";

export default function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>access to camera Denied</Text>;
  }

  _handleOnSnap = async() => {
    let image = await ref.current.takePictureAsync();
    navigation.navigate("AddImage",image)
    console.log(image);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={ref}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ratio="1:1"
      >
        <View style={styles.cameraButton}>
          <AppButton name="click" _handleOnPress={_handleOnSnap} />
        </View>
      </Camera>
    </View>
  );
}
