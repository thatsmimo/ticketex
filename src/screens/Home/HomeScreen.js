import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Separator } from "../../components";
import { Languages, Colors, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import Api from "../../js/service/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import index from "../../components/Separator";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState(null);
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [primaryDropdown, setPrimaryDropDown] = useState("");
  const [secondaryDropdown, setSecondaryDropDown] = useState("");

  useEffect(() => {
    search();
    getOptions();
  }, []);

  const insets = useSafeAreaInsets();

  const search = async (value) => {
    setLoader(true);

    const response = await Api.get(
      "events/list?search=" + searchText + "&categoryId=" + (value ? value : "")
    );
    setLoader(false);
    if (response.status) {
      setEvents(response.events);
    }
  };

  const getOptions = async () => {
    const response = await Api.get("category/list");
    console.log("res: ", response);
    if (response.status) {
      setOptions(response.categories);
    }
  };

  const _handleDropDown = (value) => {
    search(value);
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Ticket", item.id)}
        style={CommonStyles.cardNoBg}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: item.image_url }} style={styles.cardUserImg} />
          <View style={{ paddingLeft: 10, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.cardDetailsTitle}>{item.name}</Text>
              <View style={CommonStyles.mainChipContainer}>
                <Text numberOfLines={1} style={CommonStyles.mainChipTxt}>
                  {item.name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={styles.chipWithDate(true)}>
                  <Text numberOfLines={1} style={styles.chipWithDateTxt}>
                    {item.start}
                  </Text>
                </View>
              </View>
              <Separator width={10} />
              <View style={{ flex: 1, marginTop: 20 }}>
                <View style={styles.chipWithDate(false)}>
                  <Text numberOfLines={1} style={styles.chipWithDateTxt}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.container,
        paddingTop: insets.top,
      }}
    >
      <View style={styles.container}>
        <Image
          source={Assets.logo_app_name}
          style={{ height: 65, width: 65 }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            height: 50,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderColor: Colors.lineColor,
            borderWidth: 0.4,
            borderRadius: 8,
            alignItems: "center",
            backgroundColor: Colors.background,
          }}
        >
          <Ionicons
            name={IconDir.Ionicons.search}
            size={25}
            color={Colors.lineColor}
          />
          <TextInput
            placeholder={Languages.Search}
            style={{
              fontSize: 16,
              fontFamily: "semi",
              color: Colors.lineColor,
              paddingLeft: 10,
              flex: 1,
            }}
            onChangeText={(text) => {
              setSearchText(text);
              search();
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View
            style={{
              backgroundColor: "#EEF7FF",
              borderRadius: 20,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Picker
              selectedValue={primaryDropdown}
              style={{
                flex: 1,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setPrimaryDropDown(itemValue);
                _handleDropDown(itemIndex);
                console.log("itemvalue : ", itemValue);
                console.log("itemindex : ", itemIndex);
              }}
            >
              <Picker.Item
                label="select category"
                value=""
                color={Colors.lineColor}
              />
              {options.map((element, index) => (
                <Picker.Item
                  label={element.name}
                  value={index}
                  key={index}
                  color="black"
                />
              ))}
            </Picker>
          </View>
          <Separator width={10} />
          {/* <View
            style={{
              backgroundColor: "#EEF7FF",
              borderRadius: 20,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Picker
              enabled={false}
              selectedValue={secondaryDropdown}
              style={{
                flex: 1,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setSecondaryDropDown(itemValue);
                _handleDropDown();
              }}
            >
              <Picker.Item label="----" value="default" />
              <Picker.Item label="1" value="java" />
            </Picker>
          </View> */}
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
        data={events}
        ItemSeparatorComponent={Separator}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Separator}
        ListFooterComponent={<Separator heigh={30} />}
        refreshing={loader}
        onRefresh={search}
      />
    </View>
  );
};
export default HomeScreen;
