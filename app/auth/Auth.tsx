import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Button,
  TextInput,
  Text,
} from "react-native";
import supabase from "../lib/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  async function signInWithPhone() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      phone: phone,
      password: password,
      options: {
        data: {
          email: `${phone.replace(/\D/g, "")}@phone-auth.user`,
          full_name: fullName || `User-${phone.slice(-4)}`,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } /*else {
      setShowOtpInput(true)
    }*/
    setLoading(false);
  }

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
          email: `${phone.replace(/\D/g, "")}@phone-auth.user`,
          full_name: fullName || `User-${phone.slice(-4)}`,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      setShowOtpInput(true);
      Alert.alert("Please enter the 6-digit code sent to your phone");
    }
    if (!session) Alert.alert("Please check your inbox for sms verification!");
    setLoading(false);
  }

  async function verifyOtpCode() {
    setLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: "sms",
      });

      if (error) throw error;

      if (session) {
        Alert.alert("Success", "Phone number verified successfully!");
        setShowOtpInput(false);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {!showOtpInput ? (
        <>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPhone(text)}
              value={phone}
              placeholder="Enter your number"
              autoCapitalize={"none"}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              placeholder="Enter your full name"
              autoCapitalize={"words"}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title="Sign in"
              disabled={loading}
              onPress={() => signInWithPhone()}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Button
              title="Sign up"
              disabled={loading}
              onPress={() => signUpWithPhone()}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.verticallySpaced}>
            <Text style={styles.label}>Enter 6-digit verification code</Text>
            <TextInput
              style={styles.input}
              onChangeText={setOtp}
              value={otp}
              placeholder="123456"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title="Verify"
              disabled={loading || otp.length !== 6}
              onPress={verifyOtpCode}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Button
              title="Back"
              disabled={loading}
              onPress={() => setShowOtpInput(false)}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
