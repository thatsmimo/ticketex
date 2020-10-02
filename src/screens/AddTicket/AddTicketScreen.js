import React, { useState } from "react";
import { View, Picker, Text } from "react-native";
import styles from "./styles";
import { AppHeader, AppButton, AppEditText } from "../../components";

const AddTicketScreen = ({ navigation }) => {
  const [selectedFirst, setSelectedFirst] = useState(false);
  const [selectedSecond, setSelectedSecond] = useState(false);
  const [quantity, setQuantity] = useState("----");
  const [eventType, setEventType] = useState("----");
  const [classType, setClassType] = useState("----");

  const _handlenavigate = () => navigation.navigate("AddImage");

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
                onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)}
              >
                <Picker.Item label="----" value="default" />
                <Picker.Item label="1" value="java" />
              </Picker>
            </View>
            <View style={styles.input}>
              <Text>Price per Ticket</Text>
              <AppEditText />
            </View>
          </View>
          <View style={styles.btn}>
            <AppButton name="next" _handleOnPress={_handlenavigate} />
          </View>
        </>
      );
    } else {
      return <></>;
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
      <Text style={styles.text}>
        Note: Based on ticket class the price should not exceed 240 SAR
      </Text>
    </View>
  );
};
export default AddTicketScreen;