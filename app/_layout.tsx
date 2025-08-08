import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import screens from "./data/screens";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="pages/Dashboard">
        {screens.map((screen) => (
          <Stack.Screen 
            key={screen.name}
            name={screen.name}
            options={screen.options}
          />
        ))}
      </Stack>
    </SafeAreaProvider>
  );
}