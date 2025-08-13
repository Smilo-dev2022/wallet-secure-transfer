import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import splashStyles from "../styles/splashStyles";

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/pages/Landing')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.circle}>
        <Text style={splashStyles.title}>Kasi Wallet</Text>
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      </View>
    </View>
  );
}
