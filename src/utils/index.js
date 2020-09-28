import { StatusBar, Platform, ToastAndroid } from "react-native";

// platform android
const hasNotchAndroid =
  Platform.OS === "android" && StatusBar.currentHeight > 24;

const isIphoneX = Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS;

const notify = (message) => {
  if (Platform.os == "ios") {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  } else {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
};

export { hasNotchAndroid, isIphoneX, notify };
