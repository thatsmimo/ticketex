import React from "react";
import { View, Text, Image } from "react-native";
import { AppHeader, AppButton, AppEditText } from "../../components";
import {
  Languages,
  Colors,
  Assets,
  IconDir,
  CommonStyles,
} from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddBankScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title={Languages.AddBankAccount} navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={Assets.ic_bank}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTxt}>{Languages.AddBankAccount}</Text>
        <AppEditText hint={Languages.IBAN} />
        <AppEditText hint={Languages.BeneficiaryName} />
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTxt}>{Languages.BankName}</Text>
          <Ionicons
            name={IconDir.Ionicons.down}
            size={20}
            color={Colors.lineColor}
            style={styles.downIcon}
          />
        </View>
        <AppButton
          name={Languages.AddNewBank}
          containerStyle={CommonStyles.appBtn}
        />
      </View>
    </View>
  );
};

export default AddBankScreen;
