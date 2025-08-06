import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import signupStyles from "./styles/signupStyles";

import { Link } from "expo-router";

export default function Signup() {
  return (
    <View style={signupStyles.container}>
      <View style={signupStyles.form}>
        <Text style={signupStyles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          style={signupStyles.input}
        />

        <Text style={signupStyles.label}>Username</Text>
        <TextInput
          placeholder="Choose a username"
          placeholderTextColor="#999"
          style={signupStyles.input}
        />

        <Text style={signupStyles.label}>Phone Number or Email</Text>
        <TextInput
          placeholder="Enter your phone or email"
          placeholderTextColor="#999"
          style={signupStyles.input}
        />

        <Text style={signupStyles.label}>Password</Text>
        <TextInput
          placeholder="Enter a password"
          placeholderTextColor="#999"
          secureTextEntry
          style={signupStyles.input}
        />

        <Text style={signupStyles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Re-enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          style={signupStyles.input}
        />

        <View style={signupStyles.buttonContainer}>
          <Button title="Sign Up" color="#FFD400" onPress={() => {}} />
        </View>
        <View style={signupStyles.centeredContainer}>
          <Link href="/components/Login" style={signupStyles.loginLink}>
            <Text style={signupStyles.loginLinkText}>
              Already have an account?{" "}
              <Text style={signupStyles.loginBold}>Login</Text>
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
