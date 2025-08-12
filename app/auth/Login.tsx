import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import loginStyles from "../styles/loginStyles";
import supabase from "../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithPhone() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      phone: phone,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/pages/Wallet")
    }
    setLoading(false);
  }

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.form}>
        <Text style={loginStyles.label}>Number</Text>
        <TextInput
          placeholder="+2700000000"
          placeholderTextColor="#999"
          style={loginStyles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          autoCapitalize={"none"}
        />

        <Text style={loginStyles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#999"
          style={loginStyles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <View style={loginStyles.buttonContainer}>
          <Button
            title="Login"
            color="#F97316"
            disabled={loading}
            onPress={() => signInWithPhone()}
          />
        </View>

        <View style={loginStyles.centeredContainer}>
          <Link href="/auth/Signup" style={loginStyles.loginLink}>
            <Text style={loginStyles.loginLinkText}>
              Don&apos;t have ann account?{" "}
              <Text style={[loginStyles.loginBold, { color: "#0082ff" }]}>
                Sign Up
              </Text>
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
