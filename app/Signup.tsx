import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import supabase  from './lib/supabase'
import signupStyles from "./styles/signupStyles";

import { Link } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const { data: {session}, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if(error) Alert.alert(error.message)
    if(!session) Alert.alert('please check your email for verification')
    setLoading(false)
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

        <Text style={signupStyles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999"
          style={signupStyles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          <Button title="Sign Up" color="#F97316" onPress={() => signUpWithEmail()} disabled={loading}/>
        </View>
        <View style={signupStyles.centeredContainer}>
          <Link href="/Login" style={signupStyles.loginLink}>
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
