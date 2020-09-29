import React from "react";
import { View, Text, FlatList, Image, I18nManager } from "react-native";
import { Languages, Colors, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
const TicketScreen = ({ navigation }) => {
  const renderList = () => (
    <View style={styles.card()}>
      <View style={styles.rowAsContainer}>
        <Text style={styles.itemHeaderTxt}>{Languages.AvailableTickets}</Text>
        <Text
          onPress={() => navigation.navigate("TicketDetails")}
          style={styles.itemShowMoreTxt}
        >
          {Languages.ShowMore}
        </Text>
      </View>
      {/* List */}
      <>
        <View style={styles.rowAsContainer}>
          <Text style={styles.itemBodyTxt}>2 X Family Section - Regular</Text>
          <Text style={styles.itemBodyTxt}>200 SAR / Ticket</Text>
        </View>
        <Text style={styles.itemIconTxt}>
          <Ionicons name={IconDir.Ionicons.user} /> Khalid Mohamed
        </Text>
      </>
      <View style={styles.itemSeparatorHorizontal} />
    </View>
  );

  return (
    <>
      <StatusBar translucent style={"light"} />

      <View>
        <Image
          source={require("../../../assets/images/player.png")}
          style={styles.headerBigImg}
        />
        <View style={styles.headerTopContainer}>
          <IconButton
            icon={
              I18nManager.isRTL
                ? IconDir.MaterialCommunityIcons.arrowRight
                : IconDir.MaterialCommunityIcons.arrowLeft
            }
            color={Colors.background}
            size={40}
            onPress={navigation.goBack}
          />
          <Text style={styles.headerBigTxt}>ALHILAL vs ALNASSER</Text>
        </View>
        <View style={styles.headerBtmContainer}>
          <View style={styles.headerOpacityContainer}>
            <Text style={styles.whiteTxt13}>{Languages.Available} 3</Text>
            <View style={styles.whiteSeparatorHorizontal} />
            <Text style={styles.whiteTxt13}>{Languages.Sold} 1</Text>
          </View>
        </View>
      </View>

      <View style={styles.card(true)}>
        <View style={styles.rowAsContainer}>
          <Text style={styles.bodyHeaderTxt}>ALHILAL vs ALNASSER</Text>
          <View style={CommonStyles.mainChipContainer}>
            <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
              King Cup
            </Text>
          </View>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={CommonStyles.dateTxt}>SUN 3 NOVEMBER</Text>
          <Text style={CommonStyles.dateTxt}>King Fahad Studium</Text>
          <Text style={CommonStyles.dateTxt}>Riyadh</Text>
        </View>
        <View style={styles.rowAsContainer}>
          <Text style={styles.extraTxt}>
            {Languages.OriginalSellingPrices} 180 SAR
          </Text>
        </View>
      </View>

      <FlatList
        data={["", ""]}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default TicketScreen;
