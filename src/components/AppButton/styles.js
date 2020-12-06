import { StyleSheet } from "react-native";
import { Colors, CommonStyles } from "../../js/common";

export default StyleSheet.create({
  mainContainer: (disabled) => ({
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 45 / 2,
    paddingLeft: 5,
    marginTop: 20,
    backgroundColor: !disabled ? Colors.primary : Colors.accent,
    elevation: 5,
    justifyContent: "center",
    ...CommonStyles.shadow,
  }),
  text: {
    fontSize: 16,
    fontFamily: "regular",
    color: Colors.background,
    textAlign: "center",
    flex: 1,
  },
});
