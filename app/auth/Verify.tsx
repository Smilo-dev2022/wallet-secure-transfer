import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import verifyPageStyles from "../styles/verifyPageStyles";
import supabase from "../lib/supabase";
import { useRouter } from "expo-router";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter()

  const signInWithPin = async () => {
    try {
      setLoading(true);
      setError("");

      if (!phone.startsWith("+") || '') {
        setError('please enter your number')
        throw new Error("Phone number must be in the format: +1234567890");
      }

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });

      if (error) {
        console.error("Error sending OTP", error.message);
        setError(`Failed to send OTP: ${error.message}`);
        return false;
      }

      console.log("OTP sent successfully");
      Alert.alert("OTP sent to your phone");
    } catch (err: any) {
      setError(err.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      setError("");

      if (!otp) {
        throw new Error("Please enter the OTP");
      }

      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: "sms",
      });

      if (error) {
        console.error("Error verifying OTP:", error.message);
        setError(`Failed to verify OTP: ${error.message}`);
        return false;
      }

      Alert.alert("PIN VERIFIED!");
      router.replace("/pages/Wallet")
      return true;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <KeyboardAvoidingView
      style={verifyPageStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={verifyPageStyles.header}>Login with OTP</Text>

      <TextInput
        style={verifyPageStyles.input}
        placeholder="Enter phone number (+1234567890)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={verifyPageStyles.verifyButton}
        onPress={signInWithPin}
        disabled={loading}
      >
        <Text style={verifyPageStyles.verifyText} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={verifyPageStyles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />

      <TouchableOpacity
        style={verifyPageStyles.verifyButton}
        onPress={verifyOTP}
        disabled={loading}
      >
        <Text style={verifyPageStyles.verifyText} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={verifyPageStyles.errorText}>{error}</Text> : null}
    </KeyboardAvoidingView>
  );
}
