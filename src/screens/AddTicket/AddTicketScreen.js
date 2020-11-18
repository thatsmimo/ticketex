import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  I18nManager,
} from "react-native";
import { Modal } from "react-native-paper";
import { AppButton, AppEditText, AppHeader, SnackBar } from "../../components";
import { Colors, CommonStyles, Languages } from "../../js/common";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import Api from "../../js/service/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_DEFAULTS } from "../../utils";
import Styles from "./styles";
// import { I18nManager } from "react-native";

let orgEventList = [];
let orgClassList = [];

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

  const [snackbar, setSnackBar] = useState({ isShow: false, msg: "" });
  const onDismissSnackBar = () => setSnackBar({ isShow: false });

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
      orgClassList = classResponse.data;
      setClassList(classResponse.data);
    }
    if (eventResponse.status) {
      orgEventList = eventResponse.events;
      setEventList(eventResponse.events);
    }
  };

  const _handleNav = () => {
    if (!_handleValidation()) {
      return;
    }
    const formData = {
      event_id: eventList[selectedEventPos].id,
      class_id: classList[selectedClassPos].id,
      qty: quantity,
      price: price,
      name: name,
      ticket_desc: desc,
    };
    navigation.navigate("ScanQr", {
      formData,
      isSubmitted: false,
    });
  };
  const _handleValidation = () => {
    if (selectedEventPos === -1) {
      setSnackBar({ isShow: true, msg: Languages.SelectEventType + "." });
      return;
    }
    if (selectedClassPos === -1) {
      setSnackBar({ isShow: true, msg: Languages.SelectClassType + "." });
      return;
    }
    if (price === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterPrice });
      return;
    }
    if (name === "") {
      setSnackBar({ isShow: true, msg: Languages.EnterName });
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
        <View style={Styles.listContainer}>
          <Ionicons
            size={20}
            name={
              isMatchedItem
                ? IconDir.Ionicons.radioOn
                : IconDir.Ionicons.radioOff
            }
            color={Colors.primary}
          />
          <Text style={Styles.listText}>{item.name}</Text>
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
          <View style={Styles.selectFieldContainer}>
            <Text style={Styles.selectFieldText}>{selectedTxt}</Text>
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

    currentModal == "event"
      ? setEventList([...orgEventList])
      : setClassList([...orgClassList]);
    const search_text = text;
    const filterList = (currentModal == "event"
      ? orgEventList
      : orgClassList
    ).filter((e) => !e.name.toLowerCase().search(search_text.toLowerCase()));
    console.log("filterList: ", filterList);
    currentModal == "event"
      ? setEventList([...filterList])
      : setClassList([...filterList]);
  };

  const _placeListToModal = () => {
    switch (currentModal) {
      case "event":
        return eventList;
      case "class":
        return classList;
    }
  };

  const FeildHeader = ({ name, containerStyle }) => (
    //check
    <Text
      style={{
        fontFamily: "semi",
        marginTop: 20,
        marginBottom: 5,
        color: Colors.text,
        textAlign: I18nManager.isRTL ? "left" : "left",

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
        if (orgQuantity == APP_DEFAULTS.AddTicketMaxQty) return;
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
        <AppHeader title={Languages.AddTicket} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ paddingHorizontal: 30 }}>
            <FeildHeader name={Languages.SelectEventType + ":"} />
            <SelectField
              selectedTxt={eventList[selectedEventPos]?.name}
              type={"event"}
            />
            {selectedEventPos !== -1 && (
              <>
                <FeildHeader name={Languages.SelectClassType + ":"} />
                <SelectField
                  selectedTxt={classList[selectedClassPos]?.name}
                  type={"class"}
                />
              </>
            )}
            {selectedClassPos !== -1 && (
              <>
                <FeildHeader name={Languages.Quantity + ":"} />
                <View style={Styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => _handleQuantity("-")}
                    style={Styles.quantityDecreaseContainer}
                  >
                    <Text style={Styles.quantityTextContainer}>-</Text>
                  </TouchableOpacity>
                  <View style={Styles.quantityShowContainer}>
                    <Text style={Styles.quantityTextContainer}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => _handleQuantity("+")}
                    style={Styles.quantityIncreaseContainer}
                  >
                    <Text style={Styles.quantityTextContainer}>+</Text>
                  </TouchableOpacity>
                </View>
                <FeildHeader
                  name={`${Languages.PricePerTicket} (${APP_DEFAULTS.currency})`}
                />
                <AppEditText
                  value={price}
                  containerStyle={{
                    marginTop: 0,
                  }}
                  hint={Languages.Price}
                  saveText={(t) => setPrice(t)}
                  keyBoardType="number-pad"
                />
                <FeildHeader
                  name={Languages.Note}
                  containerStyle={{
                    marginTop: 5,
                    color: Colors.negative,
                    fontSize: 13,
                  }}
                />
                <FeildHeader name={Languages.TicketName} />
                <AppEditText
                  value={name}
                  containerStyle={{ marginTop: 0 }}
                  hint={Languages.TicketName}
                  saveText={(t) => setName(t)}
                />
                <FeildHeader name={Languages.TicketDescription} />
                <AppEditText
                  value={desc}
                  containerStyle={{ marginTop: 0 }}
                  hint={Languages.TicketDescription}
                  saveText={(t) => setDesc(t)}
                />
              </>
            )}
            <AppButton
              name={Languages.Next}
              containerStyle={{ marginTop: 20, marginBottom: 40 }}
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
          hint={Languages.TypeToSearch}
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
      <SnackBar
        visible={snackbar.isShow}
        onDismissSnackBar={onDismissSnackBar}
        msg={snackbar.msg}
      />
    </>
  );
};

export default AddTicketScreen;
