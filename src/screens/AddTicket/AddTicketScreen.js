import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Modal, RadioButton } from "react-native-paper";
import styles from "./styles";
import { AppHeader, AppButton, SearchablePicker } from "../../components";
import { Colors, CommonStyles, Languages } from "../../js/common";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Api from "../../js/service/api";

const AddTicketScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [options, setOptions] = useState([]);
  // const [tempOptions, setTempOptions] = useState(null);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [primaryDropdown, setPrimaryDropDown] = useState("Select Event");
  const [eventValue, setEventValue] = useState("");

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    maxHeight: "50%",
  };

  useEffect(() => {
    // search();
    getOptions();
  }, []);

  const dummyData = [
    {
      id: "0",
      word: "shine flower",
    },
    {
      id: "1",
      word: "smile friend pizza school this is great",
    },
    {
      id: "2",
      word: "sweet",
    },
    {
      id: "3",
      word: "chocolate",
    },
    {
      id: "4",
      word: "night",
    },
    {
      id: "5",
      word: "square",
    },
    {
      id: "6",
      word: "books stars enjoy",
    },
    {
      id: "7",
      word: "house",
    },
    {
      id: "9",
      word: "pencil",
    },
    {
      id: "10",
      word: "pencil",
    },
    {
      id: "11",
      word: "pencil",
    },
    {
      id: "12",
      word: "pencil",
    },
  ];

  const getOptions = async () => {
    const response = await Api.get("category/list");
    console.log("res: ", response);
    if (response.status) {
      // setOptions(response.categories);
      setOptions(dummyData);
    }
  };

  const filteredOptions = (options, text) => {
    let temp = [];
    let tempOptions = [];
    for (let i = 0; i < options.length; i++) {
      temp.push(options[i].word);
    }
    temp.map((orgWord, index) => {
      text.split(" ").map((word) => {
        if (orgWord.toLowerCase().indexOf(word.toLowerCase()) != -1) {
          tempOptions.push(options[index]);
        }
      });
    });
    setOptions(tempOptions);
  };

  const EventName = () => {
    return (
      <>
        <SelectField text={primaryDropdown} />
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TextInput
            style={{
              borderColor: "black",
              borderRadius: 10,
              borderWidth: 0.2,
              marginBottom: 13,
              // height: 30,
              padding: 5,
            }}
            onChangeText={(text) => {
              filteredOptions(options, text);
            }}
          />
          <FlatList
            data={options}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
          />
        </Modal>
      </>
    );
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPrimaryDropDown(item.word);
          hideModal();
          setEventValue(item.id);
        }}
        style={{ paddingVertical: 8 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontFamily: "regular", fontSize: 15 }}>
            {item.word}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const SelectField = ({ text }) => {
    return (
      <>
        <View style={{ marginHorizontal: "10%" }}>
          <TouchableOpacity onPress={showModal}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View
                style={{
                  backgroundColor: "#EEF7FF",
                  borderRadius: 20,
                  flex: 1,
                  flexDirection: "row",
                  padding: 13,
                }}
              >
                <Text
                  style={{
                    fontFamily: "semi",
                    flex: 1,
                    color: Colors.lineColor,
                  }}
                >
                  {text}
                </Text>
                <Ionicons name={IconDir.Ionicons.down} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title="Add Ticket" />
      <EventName />
    </View>
  );
};
export default AddTicketScreen;
