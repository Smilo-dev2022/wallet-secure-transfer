import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";
import dashBoardStyles from "../styles/dashboardStyles";
import dashBoardItems from "../data/dashboard";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Push from "../components/Push"

export default function Dashboard() {

  return (
    <View style={{ flex: 1, backgroundColor: "#37539fff" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <UserProfile />

        <View style={dashBoardStyles.gridContainer}>
          {dashBoardItems.map((item, index) => (
            <Link key={index} href={item.goto} asChild>
              <TouchableOpacity
                style={dashBoardStyles.cardButton}
                activeOpacity={0.8}
              >
                <Ionicons name={item.icon} size={36} color="#F97316" />
                <Text style={dashBoardStyles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
      <Push />
      <Footer />
    </View>
  );
}
