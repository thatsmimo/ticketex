import { StatusBar, Platform, Alert, I18nManager } from "react-native";
import { Languages } from "../js/common";

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

const PAYMENT_META_DATA = {
  method: "VISA MASTER MADA",
  returnUrl: "https://www.nshtri.com/server.php",
  locale: I18nManager.isRTL ? "ar" : "en",
  userAgentAndroid:
    "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
  address: {
    street1: "colony 23, gate road",
    city: "Riyadh",
    state: "Minraqat Al-Riyad",
    country: "SA",
    postcode: "11543",
  },
};

const APP_KEYS = {
  oAuthClientSecret: "NQKbFoKFXkLZh6AMkF7P4KiwRgE3wqhOHJzNyw5V",
};

const textGenerate = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const numberGenerate = (length) => {
  var result = "";
  var characters = "012345678";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const showAlert = (title = "", msg = "", onPress = null) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: Languages.Ok,
        onPress: onPress,
      },
    ],
    { cancelable: false }
  );
};

const returnPaymentGatewayHtml = (locale, token, method) =>
  "<!DOCTYPE html>" +
  '<html lang="en">' +
  "<head>" +
  '<meta charset="UTF-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
  "<script>" +
  "var wpwlOptions = {" +
  'locale: "' +
  locale +
  '"' +
  "}" +
  "</script>" +
  '<script src="https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=' +
  token +
  '"></script>' +
  "</head>" +
  '<body style="margin-top:30px">' +
  '<form action="https://www.nshtri.com/server.php" class="paymentWidgets" data-brands="' +
  method +
  '"></form>' +
  "</body>" +
  "</html>";

const validateName = (name) => {
  const re = /^[a-zA-Z ]+$/;
  return re.test(String(name).toLowerCase());
};

/*
 * Returns 1 if the IBAN is valid
 * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
 * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
 */
function isValidIBANNumber(input) {
  var CODE_LENGTHS = {
    AD: 24,
    AE: 23,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CR: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
    AL: 28,
    BY: 28,
    CR: 22,
    EG: 29,
    GE: 22,
    IQ: 23,
    LC: 32,
    SC: 31,
    ST: 25,
    SV: 28,
    TL: 23,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20,
  };
  var iban = String(input)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, ""), // keep only alphanumeric characters
    code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
    digits;
  // check syntax and length
  if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
    return false;
  }
  // rearrange country code and check digits, and convert chars to ints
  digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
    return letter.charCodeAt(0) - 55;
  });
  // final check
  return mod97(digits);
}

function mod97(string) {
  var checksum = string.slice(0, 2),
    fragment;
  for (var offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

export {
  hasNotchAndroid,
  isIphoneX,
  imgBaseUrl,
  globalDateFormatter,
  APP_DEFAULTS,
  PAYMENT_META_DATA,
  APP_KEYS,
  showAlert,
  returnPaymentGatewayHtml,
  textGenerate,
  numberGenerate,
  validateName,
  isValidIBANNumber,
};
