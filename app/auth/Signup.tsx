import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import supabase from "../lib/supabase";
import signupStyles from "../styles/signupStyles";
import { Link, useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithPhone() {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      phone: phone,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Success",
        "Account created successfully! Please verify your phone number."
      );
      router.replace("/auth/Verify");
    }
    if (!session) Alert.alert("Please check your inbox for sms verification!");
    setLoading(false);
  }

  return (
    <View style={signupStyles.container}>
      <View style={signupStyles.form}>
        <Text style={signupStyles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          style={signupStyles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={signupStyles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter your number"
          placeholderTextColor="#999"
          style={signupStyles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <Text style={signupStyles.label}>Password</Text>
        <TextInput
          placeholder="Enter a password"
          placeholderTextColor="#999"
          secureTextEntry
          style={signupStyles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={signupStyles.buttonContainer}>
          <Button
            title="Sign Up"
            color="#F97316"
            onPress={() => signUpWithPhone()}
            disabled={loading}
          />
        </View>
        <View style={signupStyles.centeredContainer}>
          <Link href="/auth/Login" style={signupStyles.loginLink}>
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
