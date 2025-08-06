import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "./components/Header";
import aboutStyles from "./styles/aboutStyles";

export default function About() {

  return (
    <View style={aboutStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={aboutStyles.content}>
        <Text style={aboutStyles.title}>Welcome to iKasi Wallet</Text>

        <View style={aboutStyles.card}>
          <Image
            source={require("../assets/images/screenpay.jpg")}
            style={aboutStyles.image}
          />
          <Text style={aboutStyles.cardText}>Keep track of your bills easily</Text>
        </View>

        <View style={aboutStyles.card}>
          <Image
            source={require("../assets/images/transfer.jpg")}
            style={aboutStyles.image}
          />
          <Text style={aboutStyles.cardText}>Send money to friends & family</Text>
        </View>
      </ScrollView>

      <View style={aboutStyles.buttonContainer}>
        <TouchableOpacity style={aboutStyles.loginButton}>
          <Text style={aboutStyles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={aboutStyles.signupButton}>
          <Text style={aboutStyles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
