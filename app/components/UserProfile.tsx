import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Text } from "react-native";

const UserProfile = () => {
  return (
    <View style={profileStyles.profileContainer}>
      <View></View>
      <View style={profileStyles.profilePicture}>
        <MaterialCommunityIcons
          name="face-man-profile"
          size={48}
          color="black"
        />
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
    marginTop: 50
  },
});

export default UserProfile;
