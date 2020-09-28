import React, { useReducer, useEffect, createContext } from "react";
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

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppTabBarTxt = ({ name }) => (
  <Text style={{ fontSize: 13, fontFamily: "regular" }}>{name}</Text>
);

const index = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_USER_DETAILS":
          return {
            ...prevState,
            userDetails: action.userDetails,
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
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userDetails;
      try {
        userDetails = await AsyncStorage.getItem("userDetails");
        console.log("userDetails: ", userDetails);
      } catch (e) {
        // Restoring failed
      }

      dispatch({ type: "RESTORE_USER_DETAILS", userDetails: userDetails });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (signInData) => {
        console.log("data: ", signInData);

        await AsyncStorage.setItem("userDetails", signInData.userDetails);

        dispatch({ type: "SIGN_IN", userDetails: signInData.userDetails });
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

  const PlatformStatusBar = () => (
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

  // ---------------------------------------------------
  const LoginStack = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={screens.LoginScreen} />
    </Stack.Navigator>
  );

  const HomeStack = () => (
    <Stack.Navigator headerMode="none">
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
      <Stack.Screen name="Balance" component={screens.BalanceScreen} />
      <Stack.Screen name="Bank" component={screens.BankScreen} />
      <Stack.Screen name="AddBank" component={screens.AddBankScreen} />
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

  const TabNav = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        // shifting={false}
        inactiveColor={Colors.lineColor}
        activeColor={Colors.primary}
        barStyle={CommonStyles.tabBarContainerStyle}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: <AppTabBarTxt name={Languages.Home} />,
            tabBarIcon: ({ color, focused }) => (
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

  const NavMainContent = () => (
    <>
      <PlatformStatusBar />
      {!state.userDetails ? <LoginStack /> : <TabNav />}
    </>
  );

  if (state.isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 25, fontFamily: "semi" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SafeAreaProvider>
          <NavMainContent />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default index;
