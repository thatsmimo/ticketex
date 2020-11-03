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

const dummyData1 = [
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
const dummyData2 = [
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
  const [classTypeList, setClassTypeList] = useState([]);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [keyword, setKeyword] = useState("");

  const [selectedEventPos, setSelectedEventPos] = useState(0); // set only event pos
  const [currentModal, setCurrentModal] = useState("event"); // (default: 1st one) set type of modals

  const [selectedClassPos, setSelectedClassPos] = useState(0); // set only class pos

  useEffect(() => {
    geteventList();
  }, []);

  const geteventList = async () => {
    setEventList(dummyData1);
    setClassTypeList(dummyData2);
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
    setClassTypeList(tempeventList);
  };

  const renderList = ({ item, index }) => {
    let isMatchedItem = false;
    switch (currentModal) {
      case "event":
        isMatchedItem = selectedEventPos === index;
        break;
      case "classType":
        isMatchedItem = selectedClassPos === index;
        break;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          hideModal();
          if (currentModal == "event") {
            setSelectedEventPos(index);
          } else {
            setSelectedClassPos(index);
          }
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
    // console.log(name);
    return (
      <>
        <View style={{ marginHorizontal: "10%" }}>
          <TouchableOpacity
            onPress={() => {
              showModal();
              setCurrentModal("classType");
            }}
            // onPressOut={setCurrentModal(name)}
          >
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
    // if (selectedEventPos != 0) {
    //   setCurrentModal("classType");
    // }
    console.log("current Modal: ", currentModal);
    switch (currentModal) {
      case "event":
        return eventList;
      case "classType":
        return classTypeList;
    }
  };

  const ClassType = () => {
    if (selectedEventPos != 0) {
      // return <SelectField text={classTypeList[selectedClassPos]?.word} />;
      return (
        <TouchableOpacity onPress={() => setCurrentModal("classType")}>
          <SelectField text={classTypeList[selectedClassPos]?.word} />
        </TouchableOpacity>
      );
    } else return null;
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title="Add Ticket" />
      <TouchableOpacity onPress={() => console.log("event")}>
        <SelectField text={eventList[selectedEventPos]?.word} />
      </TouchableOpacity>
      <ClassType />
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
