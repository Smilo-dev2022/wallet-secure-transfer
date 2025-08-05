import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import { Link } from "expo-router";

export default function Signup() {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Choose a username"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.label}>Phone Number or Email</Text>
        <TextInput
          placeholder="Enter your phone or email"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter a password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Re-enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button title="Sign Up" color="#FFD400" onPress={() => {}} />
        </View>
        <View style={styles.centeredContainer}>
          <Link href="/components/Login" style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              Already have an account?{" "}
              <Text style={styles.loginBold}>Login</Text>
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0082ff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#333",
  },
  loginBold: {
    fontWeight: "bold",
    color: "#0082ff",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
