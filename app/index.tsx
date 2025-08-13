import { useAuth } from "./auth/AuthProvider";
import Wallet from "./pages/Wallet";
import Landing from "./pages/Landing";
import { View } from "react-native";

export default function Index() {
  const { user } = useAuth()

  return (
    <View style={{ flex: 1 }}>
      { user ? <Wallet key={user.id} /> : <Landing />}
    </View>
  )
}
