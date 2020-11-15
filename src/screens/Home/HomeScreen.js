import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Modal } from "react-native-paper";
import { Separator } from "../../components";
import { Languages, Colors, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import Api from "../../js/service/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { imgBaseUrl } from "../../utils";

let orgEventList = [];

const HomeScreen = ({ navigation }) => {
  const [eventList, setEventList] = useState(null);
  const [loader, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [categoryModalState, setCategoryModalState] = useState(null);
  const [selectedModalName, setModalName] = useState(null);

  const [selectedCategoryPos, setCategoryPos] = useState(-1);
  const [selectedCityPos, setCityPos] = useState(-1);
  const [selectedCategoryID, setCategoryID] = useState(null);
  const [selectedCityID, setCityID] = useState(null);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchSearch("");
    getOptions();
  }, []);

  const fetchSearch = async (categoryId, cityId) => {
    // setCityList(city);
    setLoader(true);
    const response = await Api.get(
      "events/list?&category_id=" +
        (categoryId ? categoryId : "") +
        "&city_id=" +
        (cityId ? cityId : "")
    );
    // console.log("search event: ", response);
    setLoader(false);
    if (response.status) {
      orgEventList = response.events;
      setEventList(response.events);
    }
  };

  const search = async (value) => {
    setEventList([...orgEventList]);
    const keyword = value;
    const filterList = orgEventList.filter(
      (e) => !e.name.toLowerCase().search(keyword.toLowerCase())
    );
    // console.log("filterList: ", filterList);
    setEventList([...filterList]);
  };

  const getOptions = async () => {
    // setCityList(city);
    const categoryResponse = await Api.get("category/list");
    const cityResponse = await Api.get("events/cityList");
    console.log("res: ", cityResponse);
    if (categoryResponse.status) {
      setCategoryList(categoryResponse.categories);
    }
    if (cityResponse.status) {
      setCityList(cityResponse.data);
    }
  };

  const _moveToEventDetails = (id) => {
    // console.log(id);
    navigation.navigate("Ticket", id);
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => _moveToEventDetails(item.id)}
        style={CommonStyles.cardNoBg}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: imgBaseUrl + item.image_name,
            }}
            style={styles.cardUserImg}
          />
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

  const renderModalList = ({ item, index }) => {
    const isMatchedItem = categoryModalState
      ? selectedCategoryPos === index
      : selectedCityPos === index;

    return (
      <TouchableOpacity
        onPress={() => {
          hideModal();
          if (categoryModalState) {
            setCategoryPos(index);
            setCategoryID(item.id);
            fetchSearch(item.id, selectedCityID);
          } else {
            setCityPos(index);
            setCityID(item.id);
            fetchSearch(selectedCategoryID, item.id);
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

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.container,
          paddingTop: insets.top,
        }}
      >
        <StatusBar style={"dark"} />
        <View style={styles.container}>
          <Image
            source={Assets.logo_app_name}
            style={{ height: 65, width: 65 }}
            resizeMode="contain"
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
                search(text);
              }}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row" }}
              onPress={() => {
                showModal();
                setCategoryModalState(1);
                setModalName("category");
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.lightBlue,
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
                  {selectedCategoryPos == -1
                    ? Languages.SelectCategory
                    : categoryList[selectedCategoryPos].name}
                </Text>
                <Ionicons
                  name={IconDir.Ionicons.down}
                  size={20}
                  color={Colors.lineColor}
                />
              </View>
            </TouchableOpacity>
            <Separator width={10} />
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row" }}
              onPress={() => {
                showModal();
                setCategoryModalState(0);
                setModalName("city");
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.lightBlue,
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
                  {selectedCityPos == -1
                    ? Languages.SelectCity
                    : cityList[selectedCityPos].name}
                </Text>
                <Ionicons
                  name={IconDir.Ionicons.down}
                  size={20}
                  color={Colors.lineColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
          data={eventList}
          ItemSeparatorComponent={Separator}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={Separator}
          ListFooterComponent={<Separator heigh={30} />}
          refreshing={loader}
          onRefresh={() => fetchSearch("")}
        />
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={CommonStyles.appModalContainer}
        >
          {selectedCategoryPos !== -1 && selectedModalName == "category" ? (
            <TouchableOpacity
              onPress={() => {
                hideModal();
                setCategoryPos(-1);
                setCategoryID(null);
                fetchSearch(null, selectedCityID);
              }}
              style={{
                flexDirection: "row",
                width: 100,
                backgroundColor: Colors.lightBlue,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <Ionicons
                size={20}
                name={IconDir.Ionicons.close}
                color={Colors.primary}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "semi",
                  color: Colors.lineColor,
                  marginLeft: 8,
                }}
              >
                {Languages.Clear}
              </Text>
            </TouchableOpacity>
          ) : null}
          {selectedCityPos !== -1 && selectedModalName == "city" ? (
            <TouchableOpacity
              onPress={() => {
                hideModal();
                setCityPos(-1);
                setCityID(null);
                fetchSearch(selectedCategoryID, null);
              }}
              style={{
                flexDirection: "row",
                width: 100,
                backgroundColor: Colors.lightBlue,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <Ionicons
                size={20}
                name={IconDir.Ionicons.close}
                color={Colors.primary}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "semi",
                  color: Colors.lineColor,
                  marginLeft: 8,
                }}
              >
                {Languages.Clear}
              </Text>
            </TouchableOpacity>
          ) : null}
          <FlatList
            style={{ marginTop: 15, paddingHorizontal: 10 }}
            data={categoryModalState ? categoryList : cityList}
            renderItem={renderModalList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </Modal>
      </View>
    </>
  );
};
export default HomeScreen;
