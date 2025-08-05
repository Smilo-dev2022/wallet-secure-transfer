import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="components/SplashPage" options={{ headerShown: false }} />
        <Stack.Screen name="components/Login" options={{ headerShown: false }} />
        <Stack.Screen name="components/Signup" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
