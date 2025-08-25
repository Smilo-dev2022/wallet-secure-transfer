import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import supabase from "../lib/supabase";
import useUserStore from "../store/useUserStore";

const UserProfile = () => {
  const imageUri = useUserStore((state) => state.profileImageUri)
  const setImageUri = useUserStore((state) => state.setProfileImageUri)
  const [name, setName] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfilePicture();
      fetchName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProfilePicture = async () => {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("avatar_url")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.error("Error fetching profile picture", error);
    }

    if (profile?.avatar_url) {
      const { data: signedData, error: signedError } = await supabase.storage
        .from("profile-pictures")
        .createSignedUrl(profile.avatar_url, 60 * 60);

      if (signedError || !signedData) {
        console.error("Signed error", signedError);
        return;
      }

      setImageUri(signedData.signedUrl);
    }
  };

  const fetchName = async () => {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("full_name")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.error("Error fetching user name", error);
    }

    if (profile?.full_name) {
      setName(profile.full_name);
    }
  };

  return (
    <View style={profileStyles.profileContainer}>
      <View></View>
      <View>
        <Image
          source={{ uri: imageUri! }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: "#F97316",
            backgroundColor: "#fff",
          }}
        />
      </View>
      <Text style={profileStyles.username}>{name ?? <ActivityIndicator size="small" color="#F97316" />}</Text>
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
