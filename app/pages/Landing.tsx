import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import landingStyles from "../styles/landingStyles";

export default function Landing() {

  return (
    <View style={landingStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={landingStyles.content}>
        <Text style={landingStyles.title}>Welcome to iKasi Wallet</Text>

        <View style={landingStyles.card}>
          <Image
            source={require("../../assets/images/screenpay.jpg")}
            style={landingStyles.image}
          />
          <Text style={landingStyles.cardText}>Keep track of your bills easily</Text>
        </View>

        <View style={landingStyles.card}>
          <Image
            source={require("../../assets/images/transfer.jpg")}
            style={landingStyles.image}
          />
          <Text style={landingStyles.cardText}>Send money to friends & family</Text>
        </View>
      </ScrollView>

      <View style={landingStyles.buttonContainer}>
        <TouchableOpacity style={landingStyles.loginButton} activeOpacity={0.5}>
          <Link href={"/auth/Login"} style={landingStyles.loginText}>Login</Link>
        </TouchableOpacity>

        <TouchableOpacity style={landingStyles.signupButton} activeOpacity={0.5}>
          <Link href={"/auth/Signup"} style={landingStyles.signupText}>Sign Up</Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
