import React from "react";
import { ProgressBarAndroidComponent, Text, View } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";


const SearchablePicker = (props) => {
  return (
    <>
    <SearchableDropdown
      onItemSelect={props.onItemSelection}
      onTextChange={(text) => console.log("done")}
      containerStyle={{padding:5}}
      textInputStyle={styles.input}
      itemStyle={{
        padding: 10,
        marginTop: 2,
      }}
      itemTextStyle={{
        //text style of a single dropdown item
        fontFamily:"regular"
      }}
      itemsContainerStyle={{height:50}}
      items={props.items}
    />
  </>
  );
};

export default SearchablePicker;
