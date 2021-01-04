import "react-native-gesture-handler";
import React, { useState } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigator";

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadData = () => new Promise((resolve) => setTimeout(resolve, 2000));
  const onDataLoaded = () => setDataLoaded(true);

  let [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/AmpleSoftPro_reg.ttf"),
    bold: require("./assets/fonts/AmpleSoftPro_bold.otf"),
    semi: require("./assets/fonts/AmpleSoftPro_medium.ttf"),
  });

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadData}
        onFinish={onDataLoaded}
        autoHideSplash
      />
    );
  }

  if (!fontsLoaded) return <AppLoading />;
  return <AppNavigator />;
};

export default App;
