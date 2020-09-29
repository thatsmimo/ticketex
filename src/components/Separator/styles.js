import { StyleSheet } from "react-native";
import { Colors } from "../../js/common";

export default StyleSheet.create({
  container: (height, color, width) => ({
    height: height,
    width: width ? width : 0,
    backgroundColor: color ? color : Colors.background,
  }),
});
