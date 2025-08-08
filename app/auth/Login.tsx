
import { Link, useRouter  } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import loginStyles from "../styles/loginStyles";
import supabase from "../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/")
    }
    setLoading(false);
  }

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.form}>
        <Text style={loginStyles.label}>Username</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999"
          style={loginStyles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />

        <Text style={loginStyles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#999"
          style={loginStyles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={loginStyles.buttonContainer}>
          <Button
            title="Login"
            color="#F97316"
            disabled={loading}
            onPress={() => signInWithEmail()}
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
