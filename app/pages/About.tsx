import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import aboutStyles from "../styles/aboutStyles";
import { Link } from "expo-router";

export default function About() {

  return (
    <View style={aboutStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={aboutStyles.content}>
        <Text style={aboutStyles.title}>Welcome to iKasi Wallet</Text>

        <View style={aboutStyles.card}>
          <Image
            source={require("../../assets/images/screenpay.jpg")}
            style={aboutStyles.image}
          />
          <Text style={aboutStyles.cardText}>Keep track of your bills easily</Text>
        </View>

        <View style={aboutStyles.card}>
          <Image
            source={require("../../assets/images/transfer.jpg")}
            style={aboutStyles.image}
          />
          <Text style={aboutStyles.cardText}>Send money to friends & family</Text>
        </View>
      </ScrollView>

      <View style={aboutStyles.buttonContainer}>
        <TouchableOpacity style={aboutStyles.loginButton} activeOpacity={0.5}>
          <Link href={"/auth/Login"} style={aboutStyles.loginText}>Login</Link>
        </TouchableOpacity>

        <TouchableOpacity style={aboutStyles.signupButton} activeOpacity={0.5}>
          <Link href={"/auth/Signup"} style={aboutStyles.signupText}>Sign Up</Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
