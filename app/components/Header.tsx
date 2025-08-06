import { View, StyleSheet } from "react-native";

const Header = () => {
  return <View style={headerStyles.header}></View>;
};

const headerStyles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#0084ff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default Header
