import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-community/picker";
import { AppHeader, AppButton, AppEditText } from "../../components";
import { Colors, Languages } from "../../js/common";

const AddTicketScreen = ({ navigation }) => {
  const [selectedFirst, setSelectedFirst] = useState(false);
  const [selectedSecond, setSelectedSecond] = useState(false);
  const [selectedThird, setSelectedThird] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("----");
  const [eventType, setEventType] = useState("----");
  const [classType, setClassType] = useState("----");

  const _handleNavigate = () => {
    navigation.navigate("AddImage");
  };

  const EventType = () => {
    if (selectedFirst) {
      return (
        <View style={styles.form}>
          <Text>Class Type</Text>
          <View style={styles.pickerBG}>
            <Picker
              selectedValue={classType}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setClassType(itemValue);
                setSelectedSecond(true);
              }}
            >
              <Picker.Item label="----" value="default" />
              <Picker.Item label="Singles-Section c" value="java" />
            </Picker>
          </View>
        </View>
      );
    } else {
      return <></>;
    }
  };

  const Quantity = () => {
    if (selectedSecond) {
      return (
        <>
          <View style={styles.form}>
            <Text>Quantity</Text>
            <View style={styles.pickerBG}>
              <Picker
                selectedValue={quantity}
                style={styles.picker}
                mode="dialog"
                // prompt="ss"
                onValueChange={(itemValue, itemIndex) => {
                  setQuantity(itemValue);
                  setSelectedThird(true);
                }}
                itemStyle={{ fontFamily: "regular", fontSize: 11 }}
              >
                <Picker.Item label="----" value="default" />
                <Picker.Item label="1" value="java" />
              </Picker>
            </View>
          </View>
        </>
      );
    } else {
      return <></>;
    }
  };

  const PricePerTicket = () => {
    if (selectedThird) {
      return (
        <>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text>Price per Ticket</Text>
              {/* <AppEditText
                value={price}
                keyBoardType={"number-pad"}
                saveText={(text) => setPrice(() => text)}
              /> */}
              <View
                style={{
                  height: 45,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 45 / 2,
                  paddingLeft: 5,
                  marginTop: 15,
                  borderColor: Colors.lineColor,
                  borderWidth: 0.5,
                }}
              >
                <TextInput
                  style={{
                    fontSize: 13,
                    fontFamily: "regular",
                    color: "#1d1d1d",
                    paddingHorizontal: 10,
                    flex: 1,
                    justifyContent: "center",
                  }}
                  saveText={(text) => setPrice(() => text)}
                />
              </View>
            </View>
          </View>
          <View style={styles.btn}>
            <AppButton
              name={Languages.Next}
              _handleOnPress={_handleNavigate}
              disabled={price === "" ? true : false}
            />
          </View>
          <Text style={styles.text}>
            Note: Based on ticket class the price should not exceed 240 SAR
          </Text>
        </>
      );
    } else {
      return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Add Ticket" />
      <View style={styles.form}>
        <Text>Event Type</Text>
        <View style={styles.pickerBG}>
          <Picker
            selectedValue={eventType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setEventType(itemValue);
              setSelectedFirst(true);
            }}
          >
            <Picker.Item label="----" value="default" />
            <Picker.Item label="Alhila vs Alnaseer" value="java" />
          </Picker>
        </View>
      </View>
      <EventType />
      <Quantity />
      <PricePerTicket />
    </View>
  );
};
export default AddTicketScreen;
