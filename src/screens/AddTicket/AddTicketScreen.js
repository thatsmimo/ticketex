import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Modal, RadioButton } from "react-native-paper";
import styles from "./styles";
import { AppHeader, AppButton, SearchablePicker } from "../../components";
import { Colors, CommonStyles, Languages } from "../../js/common";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddTicketScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [primaryDropdown, setPrimaryDropDown] = useState("Set Category");
  const [options, setOptions] = useState([]);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [value, setValue] = useState("");

  const getOptions = async () => {
    const response = await Api.get("category/list");
    console.log("res: ", response);
    if (response.status) {
      setOptions(response.categories);
      // setOptions(dummyData);
    }
  };

  const ModalOptions = () => {
    return (
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={styles.modalView}>
          <ScrollView>
            <RadioButton.Group
              onValueChange={(value) => {
                setPrimaryDropDown(
                  value === " " ? "Select Category" : options[value - 1].name
                );
                setValue(value);
                setVisible(false);
                search(value);
              }}
              value={value}
            >
              <RadioButton.Item
                label="Set Category"
                value={" "}
                style={{ width: "100%" }}
                labelStyle={{ width: "80%" }}
              />
              {options.map((element, index) => (
                <RadioButton.Item
                  label={element.name}
                  value={index + 1}
                  key={index}
                  style={{ width: "100%" }}
                  labelStyle={{ width: "80%" }}
                />
              ))}
            </RadioButton.Group>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={CommonStyles.screensRootContainer(insets.top)}>
      <AppHeader title="Add Ticket" />
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
                {primaryDropdown}
              </Text>
              <Ionicons name={IconDir.Ionicons.down} size={20} />
            </View>
            {/* <Separator width={10} /> */}
          </View>
        </TouchableOpacity>
      </View>
      <ModalOptions />
    </View>
  );
};
export default AddTicketScreen;
