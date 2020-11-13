import React, { useReducer, useEffect, useState } from "react";
import { StatusBar, View, Text, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as screens from "../screens";
import { Colors, Languages, IconDir, CommonStyles } from "../js/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../js/context";
import AppLoading from "../components/AppLoading";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppTabBarTxt = ({ name }) => (
  <Text
    style={{
      fontSize: name === Languages.PurchasedTicket ? 10 : 13,
      fontFamily: "regular",
    }}
  >
    {name}
  </Text>
);

const index = () => {
  // const navigationRef = React.useRef(null);
  // const [navigationState, setNavigationState] = useState({});

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_USER_DETAILS":
          return {
            ...prevState,
            userDetails: action.userDetails,
            userToken: action.userToken,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            userDetails: action.userDetails,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            userDetails: null,
          };
      }
    },
    {
      userDetails: null,
      isLoading: true,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userDetails;
      try {
        userDetails = await AsyncStorage.getItem("userDetails");
        userToken = await AsyncStorage.getItem("userToken");
        console.log("userDetails: ", userDetails);
        console.log("userToken: ", userToken);
      } catch (e) {
        // Restoring failed
      }

      dispatch({
        type: "RESTORE_USER_DETAILS",
        userDetails: userDetails,
        token: userToken,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (signInData) => {
        console.log("data: ", signInData);

        await AsyncStorage.setItem("userDetails", signInData.userDetails);
        await AsyncStorage.setItem("userToken", signInData.tokens);

        dispatch({
          type: "SIGN_IN",
          userDetails: signInData.userDetails,
          userToken: signInData.tokens,
        });
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({ type: "SIGN_OUT" });
      },
      // signUp: async () => {
      //   dispatch({ type: "SIGN_IN", userDetails: {} });
      // },
    }),
    []
  );

  const PlatformStatusBar = () => {
    // console.log("navState: ", navState);
    return (
      <>
        {Platform.OS === "ios" ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar
            backgroundColor={Colors.background}
            barStyle="dark-content"
          />
        )}
      </>
    );
  };

  // ---------------------------------------------------
  const LoginStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={screens.LoginScreen} />
    </Stack.Navigator>
  );

  const HomeStack = () => (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="AddTicket" component={screens.AddTicketScreen} /> */}
      {/*    <Stack.Screen name="AddImage" component={screens.AddImageScreen} /> */}
      {/*    <Stack.Screen name="CameraScreen" component={screens.GetCamera} /> */}
      <Stack.Screen name="Home" component={screens.HomeScreen} />
      <Stack.Screen name="Ticket" component={screens.TicketScreen} />
      <Stack.Screen
        name="TicketDetails"
        component={screens.TicketDetailsScreen}
      />
    </Stack.Navigator>
  );

  const SellTicketStackStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SellTicket" component={screens.SellTicketScreen} />
    </Stack.Navigator>
  );

  const PurchasedTicketStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="PurchasedTicket"
        component={screens.PurchasedTicketScreen}
      />
      <Stack.Screen
        name="PurchasedTicketDetails"
        component={screens.PurchasedTicketDetailsScreen}
      />
    </Stack.Navigator>
  );

  const AccountStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MyAccount" component={screens.MyAccountScreen} />
      <Stack.Screen name="ScanQr" component={screens.ScanQRScreen} />

      <Stack.Screen name="Balance" component={screens.BalanceScreen} />
      <Stack.Screen name="Bank" component={screens.BankScreen} />
      <Stack.Screen
        name="AddBank"
        component={screens.AddBankScreen}
        {...state}
      />
      <Stack.Screen name="CreditCard" component={screens.CreditCardScreen} />
      <Stack.Screen
        name="AddCreditCard"
        component={screens.AddCreditCardScreen}
      />
      <Stack.Screen name="ContactUs" component={screens.ContactUsScreen} />
      <Stack.Screen name="Faq" component={screens.FaqScreen} />
    </Stack.Navigator>
  );

  //----------------------------------------------------

  const AddTicketStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AddTicket" component={screens.AddTicketScreen} />
      <Stack.Screen name="AddImage" component={screens.AddImageScreen} />
      <Stack.Screen name="ScanQr" component={screens.ScanQRScreen} />
      <Stack.Screen name="ReviewQr" component={screens.ReviewQrScreen} />
    </Stack.Navigator>
  );

  //----------------------------------------------------

  const TabNav = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        // shifting={false}
        inactiveColor={Colors.lineColor}
        activeColor={Colors.primary}
        barStyle={CommonStyles.tabBarContainerStyle}
        style={{ fontSize: 10 }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: <AppTabBarTxt name={Languages.Home} />,
            tabBarIcon: ({ color, focused, size }) => (
              <MaterialCommunityIcons
                name={IconDir.MaterialCommunityIcons.home}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SellTicket"
          component={SellTicketStackStack}
          options={{
            tabBarLabel: <AppTabBarTxt name={Languages.SellTicket} />,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={IconDir.MaterialCommunityIcons.ticket}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddTicket"
          component={AddTicketStack}
          options={{
            tabBarLabel: <AppTabBarTxt name={Languages.AddTicket} />,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={IconDir.MaterialCommunityIcons.tagPlus}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="PurchasedTicket"
          component={PurchasedTicketStack}
          options={{
            tabBarLabel: <AppTabBarTxt name={Languages.PurchasedTicket} />,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={IconDir.MaterialCommunityIcons.bookmark}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarLabel: <AppTabBarTxt name={Languages.Account} />,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={IconDir.MaterialCommunityIcons.account}
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const NavMainContent = ({}) => {
    // console.log("navigationRef: ", navigationRef.current);
    return (
      <>
        <PlatformStatusBar
        //navState={navigationState}
        />
        {!state.userDetails ? <LoginStack /> : <TabNav />}
      </>
    );
  };

  if (state.isLoading) {
    return <AppLoading />;
  }

  // const unsubscribe = navigationRef.current?.addListener("state", (e) => {
  //   // You can get the raw navigation state (partial state object of the root navigator)
  //   console.log(e.data.state);
  //   setNavigationState(e.data.state);

  //   // Or get the full state object with `getRootState()`
  //   // console.log(navigationRef.current.getRootState());
  // });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
      //ref={navigationRef}
      >
        <SafeAreaProvider>
          <NavMainContent />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default index;
