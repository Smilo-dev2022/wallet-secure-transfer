import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
import dashBoardStyles from "../styles/dashboardStyles";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"]
type DashboardCards = {
  title: string;
  icon: IconName
}

export default function Dashboard() {
  const menuItems: DashboardCards[] = [
    { title: "Wallet", icon: "wallet-outline" },
    { title: "Transactions", icon: "swap-horizontal-outline" },
    { title: "Bills", icon: "receipt-outline" },
    { title: "QR Code", icon: "qr-code-outline" },
    { title: "Support", icon: "help-circle-outline" },
    { title: "Verification", icon: "shield-checkmark-outline" },
    { title: "Notifications", icon: "notifications-outline" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#37539fff" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <UserProfile />

        <View style={dashBoardStyles.gridContainer}>
          {menuItems.map((item: DashboardCards, index) => (
            <TouchableOpacity
              key={index}
              style={dashBoardStyles.cardButton}
              activeOpacity={0.8}
            >
              <Ionicons name={item.icon} size={36} color="#F97316" />
              <Text style={dashBoardStyles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
