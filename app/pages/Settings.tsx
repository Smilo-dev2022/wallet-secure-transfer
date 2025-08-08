import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import settingsArr from "../data/settings";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];
type AppRoute = React.ComponentProps<typeof Link>["href"];

type SettingItem = {
  id: number;
  title: string;
  description: string;
  icon: IconName;
  goTo: AppRoute;
};

const renderItem = ({ item }: { item: SettingItem }) => {
  return (
    <Link href={item.goTo} asChild>
      <TouchableOpacity style={settingStyles.itemContainer}>
        <View style={settingStyles.iconContainer}>
          <Ionicons name={item.icon} size={24} color="#1E3A8A" />
        </View>
        <View style={settingStyles.textContainer}>
          <Text style={settingStyles.itemTitle}>{item.title}</Text>
          <Text style={settingStyles.itemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default function Settings() {
  return (
    <View style={settingStyles.container}>
      <FlatList
        data={settingsArr as unknown as SettingItem[]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={settingStyles.listContent}
      />
    </View>
  );
}

const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#F97316",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  itemDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
});
