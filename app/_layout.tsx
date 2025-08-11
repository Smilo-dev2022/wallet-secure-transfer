import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import supabase from "./lib/supabase";
import screens from "./data/screens";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/auth/Login");
      }
    };

    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/auth/Login");
        }
      }
    );

    return () => {
      clearTimeout(splashTimer);
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="pages/SplashPage"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="pages/Landing" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Signup" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack>
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
