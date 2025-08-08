import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const Footer = () => {
  return (
    <View style={footerStyles.footer}>
      <Link href={"/pages/Settings"}>
        <View style={footerStyles.iconContainer}>
          <Feather name="settings" size={24} color="orange" />
          <Text style={footerStyles.footerText}>Settings</Text>
        </View>
      </Link>

      <View style={footerStyles.iconContainer}>
        <AntDesign name="qrcode" size={24} color="orange" />
        <Text style={footerStyles.footerText}>QR Code</Text>
      </View>

      <View style={footerStyles.iconContainer}>
        <AntDesign name="arrowright" size={24} color="orange" />
        <Text style={footerStyles.footerText}>Send</Text>
      </View>
    </View>
  );
};

export default Footer;

const footerStyles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 6,
  },
  footerText: {
    fontSize: 10,
    marginTop: 5,
    color: "black",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
