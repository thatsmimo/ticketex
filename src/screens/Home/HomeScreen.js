import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Separator } from "../../components";
import { Languages, Colors, Assets, CommonStyles } from "../../js/common";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconDir from "../../js/common/IconDir";
import Api from "../../js/service/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const insets = useSafeAreaInsets();

  const search = async () => {
    setLoader(true);
    const response = await Api.get("events/list?search=" + searchText);
    console.log(response);
    setLoader(false);
    if (response.status) {
      setEvents(response.events);
    }
  };

  const _handleSearch = async (text) => {
    await search();
  };

  const renderList = ({ item }) => {
    console.log(item);
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
              // search;
              _handleSearch(text);
            }}
            // onChange={_handleSearch}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View
            style={{
              backgroundColor: "#EEF7FF",
              borderRadius: 20,
              flex: 1,
              padding: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontFamily: "semi", flex: 1, paddingHorizontal: 5 }}>
              Riyadh
            </Text>
            <Ionicons name={IconDir.Ionicons.down} size={20} />
          </View>
          <Separator width={10} />
          <View
            style={{
              backgroundColor: "#EEF7FF",
              borderRadius: 20,
              flex: 1,
              padding: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontFamily: "semi", flex: 1, paddingHorizontal: 5 }}>
              Riyadh
            </Text>
            <Ionicons name={IconDir.Ionicons.down} size={20} />
          </View>
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
      {/* <View
        style={{
          ...StyleSheet.absoluteFill,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(1,1,1,.3)",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View> */}
    </View>
  );
};
export default HomeScreen;
