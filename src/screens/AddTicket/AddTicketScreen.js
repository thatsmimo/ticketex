import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-community/picker";
import { AppHeader, AppButton, SearchablePicker } from "../../components";
import { Colors, Languages } from "../../js/common";

const AddTicketScreen = ({ navigation }) => {
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedThird, setSelectedThird] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("----");
  const [eventType, setEventType] = useState("----");
  const [classType, setClassType] = useState("----");

  var _event = [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
  ];
  var _classtype = [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
  ];
  var _quantity = [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
  ];

  const _handleNavigate = () => {
    navigation.navigate("AddImage");
  };

  const ClassType = () => {
    return (
      <View style={styles.form}>
        <Text>Class Type</Text>
        {/* <View style={styles.pickerBG}>
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
          </View> */}
        <SearchablePicker
          items={_classtype}
          onItemSelection={(item) => {
            console.log(item);
            setEventType(item.name);
            setSelectedSecond(() => item.name);
          }}
        />
      </View>
    );
  };

  const Quantity = () => {
    return (
      <>
        <View style={styles.form}>
          <Text>Quantity</Text>
          {/* <View style={styles.pickerBG}>
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
            </View> */}
          <SearchablePicker
            items={_quantity}
            onItemSelection={(item) => {
              setQuantity(item.name);
              setSelectedThird(item.name);
            }}
          />
        </View>
      </>
    );
  };

  const PricePerTicket = () => {
    return (
      <>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text>Price per Ticket</Text>
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
                onChangeText={(text) => setPrice(text)}
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
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Add Ticket" />
      <View style={styles.form}>
        <Text>Event Type</Text>
        <SearchablePicker
          items={_event}
          onItemSelection={(item) => {
            setClassType(item.name);
            setSelectedFirst(item.name);
          }}
        />
      </View>

      {/* <View style={styles.form}>
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
      </View> */}
      {selectedFirst != "" ? <ClassType /> : null}
      {selectedSecond != "" ? <Quantity /> : null}
      {selectedThird != "" ? <PricePerTicket /> : null}
    </View>
  );
};
export default AddTicketScreen;
