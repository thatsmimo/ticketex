import { StatusBar, Platform } from "react-native";

// platform android
const hasNotchAndroid =
  Platform.OS === "android" && StatusBar.currentHeight > 24;
const isIphoneX = Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS;

const imgBaseUrl = "https://ticketex.co/server/public/images/events/";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const globalDateFormatter = (dbDate) => {
  if (!dbDate || dbDate == "" || typeof dbDate === "undefined") {
    return "";
  }

  const year = dbDate.slice(0, 4);
  const month = dbDate.slice(5, 7);
  const day = dbDate.slice(8, 10);

  return day + " " + months[month - 1] + " " + year;
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
  imgBaseUrl,
  globalDateFormatter,
  APP_DEFAULTS,
  APP_KEYS,
};
