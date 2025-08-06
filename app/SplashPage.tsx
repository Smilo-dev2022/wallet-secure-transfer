import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import splashStyles from "./styles/splashStyles";

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Dashboard')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.circle}>
        <Text style={splashStyles.title}>Kasi Wallet</Text>
      </View>
    </View>
  );
}
