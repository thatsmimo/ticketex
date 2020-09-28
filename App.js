import "react-native-gesture-handler";
import React from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigator";
import { I18nManager } from "react-native";

const App = () => {
  let [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/AmpleSoftPro_reg.ttf"),
    bold: require("./assets/fonts/AmpleSoftPro_bold.otf"),
    semi: require("./assets/fonts/AmpleSoftPro_medium.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;
  return <AppNavigator />;
};

export default App;
