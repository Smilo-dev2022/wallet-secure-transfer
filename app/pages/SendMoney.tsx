import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { verifyRecipient, transferMoney } from "../lib/supabase";
import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "expo-router";
import sendMoneyStyles from "../styles/sendMoneyStyles";

export default function SendMoney() {
  const [recipientIdentifier, setRecipientIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState("email");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [verifiedRecipient, setVerifiedRecipient] =
    useState<VerifiedRecipient | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  interface VerifiedRecipient {
    exists: boolean;
    userId?: string;
    fullName?: string;
  }

  // Format phone number to enforce +27 format
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters except +
    let cleaned = text.replace(/[^\d+]/g, '');
    
    // If it doesn't start with +, add it
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    
    // If it starts with + but not +27, enforce +27
    if (cleaned.startsWith('+') && !cleaned.startsWith('+27')) {
      // If user enters just +, add 27
      if (cleaned === '+') {
        cleaned = '+27';
      } else if (cleaned.startsWith('+0')) {
        // If user enters +0, replace with +27
        cleaned = '+27' + cleaned.substring(2);
      } else if (cleaned.startsWith('+')) {
        // If user enters + followed by other numbers, enforce +27
        cleaned = '+27' + cleaned.substring(1);
      }
    }
    
    // Limit to reasonable length (country code + 9 digits)
    if (cleaned.length > 12) {
      cleaned = cleaned.substring(0, 12);
    }
    
    return cleaned;
  };

  const handleRecipientIdentifierChange = (text: string) => {
    if (identifierType === "phone") {
      const formatted = formatPhoneNumber(text);
      setRecipientIdentifier(formatted);
    } else {
      setRecipientIdentifier(text);
    }
  };

  const handleVerifyRecipient = async () => {
    try {
      setIsVerifying(true);
      
      // Validate phone number format if phone is selected
      if (identifierType === "phone" && (!recipientIdentifier.startsWith('+27') || recipientIdentifier.length < 12)) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid South African phone number starting with +27');
        setIsVerifying(false);
        return;
      }

      const result = await verifyRecipient(recipientIdentifier, identifierType);
      if (result.exists) {
        setVerifiedRecipient(result);
        Alert.alert(`Recipient found: ${result.fullName}`);
      } else {
        Alert.alert("Recipient not found. Make sure email/phone is correct");
        setVerifiedRecipient(null);
      }
    } catch (error: any) {
      Alert.alert(`Error: ${error.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTransfer = async () => {
    if (!verifiedRecipient?.exists) {
      Alert.alert("Please verify recipient first");
      return;
    }
    try {
      setIsTransferring(true);
      const userId = user?.id;
      if (!userId) {
        Alert.alert("You must be signed in to send money");
        return;
      }
      const sanitized = amount.trim().replace(/,/g, "");
      if (!/^\d+$/.test(sanitized)) {
        Alert.alert("Enter a valid whole number amount (no decimals)");
        return;
      }
      const amountInt = parseInt(sanitized, 10);
      if (amountInt <= 0) {
        Alert.alert("Enter a valid amount");
        return;
      }
      await transferMoney(
        userId,
        recipientIdentifier,
        identifierType,
        amountInt,
        description
      );
      Alert.alert("Transfer completed successfully");
      router.replace("/pages/Wallet");
    } catch (error: any) {
      Alert.alert(`Transfer failed: ${error.message}`);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={sendMoneyStyles.scrollContent}>
        <View style={sendMoneyStyles.container}>
          <Text style={sendMoneyStyles.pageTitle}>Send Money</Text>

          {/* Step 1: Verify Recipient */}
          <View style={sendMoneyStyles.inputCard}>
            <Text style={sendMoneyStyles.label}>Verify Receiver</Text>
            <Picker
              selectedValue={identifierType}
              onValueChange={(value) => setIdentifierType(String(value))}
              style={sendMoneyStyles.picker}
            >
              <Picker.Item label="Email" value="email" />
              <Picker.Item label="Phone" value="phone" />
            </Picker>

            <TextInput
              placeholder={
                identifierType === "email"
                  ? "Recipient email"
                  : "Recipient phone (+27 123 456 789)"
              }
              value={recipientIdentifier}
              onChangeText={handleRecipientIdentifierChange}
              keyboardType={
                identifierType === "email" ? "email-address" : "phone-pad"
              }
              autoCapitalize="none"
              style={sendMoneyStyles.input}
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              onPress={handleVerifyRecipient}
              style={sendMoneyStyles.sendBtn}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={sendMoneyStyles.sendBtnText}>
                  Verify Recipient
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Step 2: Transfer */}
          {verifiedRecipient?.exists && (
            <View style={sendMoneyStyles.inputCard}>
              <Text style={sendMoneyStyles.label}>
                Sending to: {verifiedRecipient.fullName}
              </Text>

              <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={sendMoneyStyles.input}
                placeholderTextColor="#999"
              />

              <TextInput
                placeholder="Description (optional)"
                value={description}
                onChangeText={setDescription}
                style={sendMoneyStyles.input}
                placeholderTextColor="#999"
              />

              <TouchableOpacity
                onPress={handleTransfer}
                style={sendMoneyStyles.sendBtn}
                disabled={isTransferring || !amount}
              >
                {isTransferring ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={sendMoneyStyles.sendBtnText}>Send Money</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
