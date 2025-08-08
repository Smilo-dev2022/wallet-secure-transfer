import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserProfile = () => {
  return (
    <View style={profileStyles.profileContainer}>
      <View></View>
      <View style={profileStyles.profilePicture}>
        <Ionicons name="person-circle-outline" size={50} color="black" />
      </View>
      <Text style={profileStyles.username}>Garvin Chimone</Text>
    </View>
  );
};

const profileStyles = StyleSheet.create({
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F97316",
    marginBottom: 15,
  },
  username: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 30,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
});

export default UserProfile;
