import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ComponentProps } from "react";

// type AppRoute = React.ComponentProps<typeof Link>["href"];
type IconName = ComponentProps<typeof Ionicons>["name"];
type BillItems = {
  id: number;
  icon: IconName;
  name: string;
}

export default function Bills() {
  const billsCategories:  BillItems[] = [
    { id: 1, name: "Electricity", icon: "flash-outline" },
    { id: 2, name: "Water", icon: "water-outline" },
    { id: 3, name: "Airtime", icon: "call-outline" },
    { id: 4, name: "Internet", icon: "wifi-outline" },
    { id: 5, name: "Netflix", icon: "tv-outline" },
    { id: 6, name: "Other Subscriptions", icon: "albums-outline" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Pay Your Bills</Text>
      <View style={styles.grid}>
        {billsCategories.map((bill) => (
          <Link
            key={bill.id}
            href={'/'}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Ionicons name={bill.icon} size={32} color="#F97316" />
              <Text style={styles.cardText}>{bill.name}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539F",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#1E3A8A",
    textAlign: "center",
  },
});
