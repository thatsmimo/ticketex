import { StatusBar, Platform, ToastAndroid } from "react-native";
// import SnackBar from "rn-snackbar";
// import Snackbar from "react-native-snackbar";

// platform android
const hasNotchAndroid =
  Platform.OS === "android" && StatusBar.currentHeight > 24;
const isIphoneX = Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS;

const imgBaseUrl = "https://ticketex.co/server/public/images/events/";

const notify = (message) => {
  if (Platform.os == "ios") {
    // Snackbar.show({
    //   text: message,
    //   duration: Snackbar.LENGTH_SHORT,
    // });
    // SnackBar.show(message, {
    //   tapToClose: true,
    //   duration: 5000,
    //   position: "top",
    //   textColor: Colors.background,
    //   backgroundColor: Colors.blueAsTheme,
    //   style: { marginTop: 40 },
    // });
  } else {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
};

const globalDateFormatter = (dbDate) => {
  return new Date(dbDate).toDateString();
};

const APP_DEFAULTS = {
  callingCode: "966",
  countryCode: "SA",
  currency: "SAR",
  flag: "flag-sa",
  name: "Saudi Arabia",
  region: "Asia",
  subregion: "Western Asia",
  AddTicketMaxQty: 5,
};

const APP_KEYS = {
  oAuthClientSecret: "NQKbFoKFXkLZh6AMkF7P4KiwRgE3wqhOHJzNyw5V",
};

export {
  hasNotchAndroid,
  isIphoneX,
  notify,
  imgBaseUrl,
  globalDateFormatter,
  APP_DEFAULTS,
  APP_KEYS,
};
