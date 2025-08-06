import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Link } from "expo-router";
import loginStyles  from "../styles/loginStyles";

export default function Login() {
  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.form}>
        <Text style={loginStyles.label}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          placeholderTextColor="#999"
          style={loginStyles.input}
        />

        <Text style={loginStyles.label}>Phone Number or Email</Text>
        <TextInput
          placeholder="Enter number or email"
          placeholderTextColor="#999"
          style={loginStyles.input}
        />

        <View style={loginStyles.buttonContainer}>
          <Button title="Login" color="#FFD400" onPress={() => {}} />
        </View>

        <View style={loginStyles.centeredContainer}>
          <Link href="/components/Signup" style={loginStyles.loginLink}>
            <Text style={loginStyles.loginLinkText}>
              Don&apos;t have an account?{" "}
              <Text style={loginStyles.loginBold}>Login</Text>
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
