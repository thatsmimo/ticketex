import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Modal } from "react-native-paper";
import { AppButton, AppEditText, AppHeader } from "../../components";
import { Colors, CommonStyles } from "../../js/common";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import Api from "../../js/service/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { notify } from "../../utils";

const AddTicketScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [eventList, setEventList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [loader, setLoader] = useState(false);

  const [visible, setVisible] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [selectedEventPos, setSelectedEventPos] = useState(-1); // set only event pos
  const [currentModal, setCurrentModal] = useState("event"); // or class // (default: 1st one) set type of modals

  const [selectedClassPos, setSelectedClassPos] = useState(-1); // set only class pos
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isScanQr, setScanQr] = useState(true);

  useEffect(() => {
    _fetchDropdownLists();
  }, []);

  useEffect(() => {
    if (route.params?.isSubmitted) {
      // updated from previous screen
      // reset all
      setTimeout(() => {
        setSelectedEventPos(-1);
        setSelectedClassPos(-1);
        setQuantity(1);
        setCurrentModal("event");
        setPrice("");
        setKeyword("");
        setName("");
        setDesc("");
      }, 200);
    }
  }, [route, route.params?.isSubmitted]);

  const _fetchDropdownLists = async () => {
    setLoader(true);
    const classResponse = await Api.get("class-type");
    const eventResponse = await Api.get("events/list");
    setLoader(false);
    if (classResponse.status) {
      setClassList(classResponse.data);
    }
    if (eventResponse.status) {
      setEventList(eventResponse.events);
    }
  };

  const _handleNav = () => {
    if (!_handleValidation()) {
      return;
    }
    let formData = new FormData();
    formData.append("event_id", eventList[selectedEventPos].id);
    formData.append("class_id", classList[selectedClassPos].id);
    formData.append("qty", quantity);
    formData.append("name", name);
    formData.append("ticket_desc", desc);
    formData.append("start", "2020-10-30");
    formData.append("end", "2020-10-30");
    console.log(formData);

    navigation.navigate("ScanQr", {
      isScanQr: isScanQr,
      formData,
      isSubmitted: false,
    });
  };
  const _handleValidation = () => {
    if (selectedEventPos === -1) {
      notify("Select event type.");
      return;
    }
    if (selectedClassPos === -1) {
      notify("Select class type.");
      return;
    }
    if (price === "") {
      notify("Enter ticket price.");
      return;
    }
    if (name === "") {
      notify("Enter ticket name.");
      return;
    }
    return true;
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderList = ({ item, index }) => {
    let isMatchedItem = false;
    switch (currentModal) {
      case "event":
        isMatchedItem = selectedEventPos === index;
        break;
      case "class":
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
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const SelectField = ({ selectedTxt, type }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setCurrentModal(type);
            showModal();
          }}
          style={{ flexDirection: "row" }}
        >
          <View
            style={{
              backgroundColor: Colors.lightBlue,
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
              {selectedTxt}
            </Text>
            <Ionicons
              name={IconDir.Ionicons.down}
              size={20}
              color={Colors.lineColor}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const _saveKeywordAndSearch = (text) => {
    setKeyword(text.trim());
  };

  const _placeListToModal = () => {
    console.log("current Modal: ", currentModal);
    switch (currentModal) {
      case "event":
        return eventList;
      case "class":
        return classList;
    }
  };

  const FeildHeader = ({ name, containerStyle }) => (
    <Text
      style={{
        fontFamily: "semi",
        marginTop: 20,
        marginBottom: 5,
        color: Colors.text,
        ...containerStyle,
      }}
    >
      {name}
    </Text>
  );

  const _handleQuantity = (type) => {
    let orgQuantity = quantity;
    switch (type) {
      case "-":
        // level condition
        if (orgQuantity == 1) return;
        orgQuantity--;
        setQuantity(orgQuantity);
        break;
      case "+":
        // level condition
        if (orgQuantity == 10) return;
        orgQuantity++;
        setQuantity(orgQuantity);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <View style={CommonStyles.screensRootContainer(insets.top)}>
        <AppHeader title="Add Ticket" />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ paddingHorizontal: 30 }}>
            <FeildHeader name={"Select Event type:"} />
            <SelectField
              selectedTxt={eventList[selectedEventPos]?.name}
              type={"event"}
            />
            {selectedEventPos !== -1 && (
              <>
                <FeildHeader name={"Select Class type:"} />
                <SelectField
                  selectedTxt={classList[selectedClassPos]?.name}
                  type={"class"}
                />
              </>
            )}
            {selectedClassPos !== -1 && (
              <>
                <FeildHeader name={"Quantity:"} />
                <View
                  style={{
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => _handleQuantity("-")}
                    style={{
                      paddingVertical: 13,
                      paddingHorizontal: 20,
                      backgroundColor: Colors.lightBlue,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "semi",
                        color: Colors.lineColor,
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      padding: 13,
                      width: 75,
                      backgroundColor: Colors.lightBlue,
                      justifyContent: "center",
                      marginHorizontal: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "semi",
                        color: Colors.lineColor,
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      {quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => _handleQuantity("+")}
                    style={{
                      padding: 13,
                      paddingHorizontal: 20,
                      backgroundColor: Colors.lightBlue,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "semi",
                        color: Colors.lineColor,
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
                <FeildHeader name={"Price per ticket (SAR)"} />
                <AppEditText
                  value={price}
                  containerStyle={{ marginTop: 0 }}
                  hint={"Price"}
                  saveText={(t) => setPrice(t)}
                  keyBoardType="number-pad"
                />
                <FeildHeader
                  name={
                    "Note: Based on ticket class the price should not exceed 240 SAR"
                  }
                  containerStyle={{
                    marginTop: 5,
                    color: Colors.negative,
                    fontSize: 13,
                  }}
                />
                <FeildHeader name={"Ticket Name"} />
                <AppEditText
                  value={name}
                  containerStyle={{ marginTop: 0 }}
                  hint={"Ticket Name"}
                  saveText={(t) => setName(t)}
                />
                <FeildHeader name={"Ticket Description"} />
                <AppEditText
                  value={desc}
                  containerStyle={{ marginTop: 0 }}
                  hint={"Ticket Description"}
                  saveText={(t) => setDesc(t)}
                />
                <FeildHeader
                  name={"Select scan or upload the ticket QR Code"}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setScanQr(true)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name={
                        isScanQr
                          ? IconDir.Ionicons.radioOn
                          : IconDir.Ionicons.radioOff
                      }
                      size={25}
                      color={Colors.primary}
                    />
                    <Text
                      style={{
                        fontFamily: "semi",
                        color: Colors.text,
                        marginLeft: 10,
                      }}
                    >
                      Scan QR Code
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setScanQr(false)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name={
                        !isScanQr
                          ? IconDir.Ionicons.radioOn
                          : IconDir.Ionicons.radioOff
                      }
                      size={25}
                      color={Colors.primary}
                    />
                    <Text
                      style={{
                        fontFamily: "semi",
                        color: Colors.text,
                        marginLeft: 10,
                      }}
                    >
                      Upload QR Code
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <AppButton
              name={"Next"}
              containerStyle={{ marginTop: 40, marginBottom: 40 }}
              _handleOnPress={_handleNav}
            />
          </View>
        </ScrollView>
      </View>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={CommonStyles.appModalContainer}
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
          refreshing={loader}
          onRefresh={_fetchDropdownLists}
          keyboardShouldPersistTaps="handled"
        />
      </Modal>
    </>
  );
};

export default AddTicketScreen;
