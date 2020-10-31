import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Modal } from "react-native-paper";
import { AppEditText, AppHeader } from "../../components";
import { Colors, CommonStyles } from "../../js/common";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const containerStyle = {
  backgroundColor: "white",
  paddingHorizontal: 20,
  paddingVertical: 10,
  marginHorizontal: 20,
  borderRadius: 8,
  maxHeight: "60%",
};

const dummyData = [
  { word: "Select Event" },
  {
    word: "shine flower",
  },
  {
    word: "smile friend pizza school this is great da d dfd ftafdfdtfa",
  },
  {
    word: "sweet",
  },
  {
    word: "chocolate",
  },
  {
    word: "night",
  },
  {
    word: "square",
  },
  {
    word: "books stars enjoy",
  },
  {
    word: "house",
  },
  {
    word: "pencil",
  },
  {
    word: "pencil",
  },
  {
    word: "pencil",
  },
  {
    word: "pencil",
  },
];

const AddTicketScreen = ({}) => {
  const insets = useSafeAreaInsets();
  const [eventList, setEventList] = useState([]);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [keyword, setKeyword] = useState("");

  const [selectedEventPos, setSelectedEventPos] = useState(0); // set only event pos
  const [currentModal, setCurrentModal] = useState("event"); // (default: 1st one) set type of modals

  useEffect(() => {
    geteventList();
  }, []);

  const geteventList = async () => {
    setEventList(dummyData);
  };

  const filteredeventList = (eventList, text) => {
    let temp = [];
    let tempeventList = [];
    for (let i = 0; i < eventList.length; i++) {
      temp.push(eventList[i].word);
    }
    temp.map((orgWord, index) => {
      text.split(" ").map((word) => {
        if (orgWord.toLowerCase().indexOf(word.toLowerCase()) != -1) {
          tempeventList.push(eventList[index]);
        }
      });
    });
    setEventList(tempeventList);
  };

  const renderList = ({ item, index }) => {
    let isMatchedItem = false;
    switch (currentModal) {
      case "event":
        isMatchedItem = selectedEventPos === index;
        break;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          hideModal();
          setSelectedEventPos(index);
        }}
        style={{ paddingVertical: 8 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            size={20}
            name={
              isMatchedItem
                ? IconDir.Ionicons.radioOn
                : IconDir.Ionicons.radioOff
            }
            color={Colors.primary}
          />
          <Text
            style={{
              fontFamily: "regular",
              fontSize: 15,
              marginLeft: 15,
            }}
          >
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
                  alignItems: "center",
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

  const _saveKeywordAndSearch = (text) => {
    filteredeventList(eventList, text);
    setKeyword(text.trim());
  };

  const _placeListToModal = () => {
    switch (currentModal) {
      case "event":
        return eventList;
    }
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title="Add Ticket" />
      <SelectField text={eventList[selectedEventPos]?.word} />
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <AppEditText
          hint="Type here to search..."
          value={keyword}
          saveText={_saveKeywordAndSearch}
        />
        <FlatList
          style={{ marginTop: 15, paddingHorizontal: 10 }}
          data={_placeListToModal()}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Modal>
    </View>
  );
};
export default AddTicketScreen;
