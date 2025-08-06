import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="About">
      {/* <Stack> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SplashPage" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="About" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
