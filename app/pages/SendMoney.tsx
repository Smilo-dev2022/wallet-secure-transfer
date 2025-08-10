import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import sendMoneyStyles from "../styles/sendMoneyStyles";

export default function SendMoney() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <KeyboardAvoidingView
      style={sendMoneyStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={sendMoneyStyles.inputCard}>
        <Text style={sendMoneyStyles.label}>To</Text>
        <TextInput
          style={sendMoneyStyles.input}
          placeholder="Phone, email, or username"
          value={recipient}
          onChangeText={setRecipient}
          placeholderTextColor="#888"
        />
      </View>

      <View style={sendMoneyStyles.inputCard}>
        <Text style={sendMoneyStyles.label}>Amount</Text>
        <TextInput
          style={sendMoneyStyles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={sendMoneyStyles.sendBtn}>
        <Text style={sendMoneyStyles.sendBtnText}>Send</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
