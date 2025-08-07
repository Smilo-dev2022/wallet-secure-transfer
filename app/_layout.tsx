import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="pages/About">
      {/* <Stack> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="pages/SplashPage" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Signup" options={{ headerShown: false }} />
        <Stack.Screen name="pages/Dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="pages/About" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
