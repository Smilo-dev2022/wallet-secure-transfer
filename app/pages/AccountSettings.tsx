import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import accountSettingsStyles from "../styles/accountSettingStyles";
import { useAuth } from "../auth/AuthProvider";
import supabase from "../lib/supabase";

export default function AccountSettings() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { signOut, user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfilePicture();
      changeEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setColor("red");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Error changing password", error);
        setMessage("Error: " + error.message);
        setColor("red");
      } else {
        setPassword("");
        setConfirmPassword("");
        setMessage("Password updated successfully");
        setColor("green");
      }
    } catch (error) {
      console.error("Error changing password", error);
      setMessage("An unexpected error occurred");
      setColor("red");
    }
  };

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

  const uploadProfilePicture = async (uri: string) => {
    if (!user) return;

    try {
      const fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${user.id}.${fileExt}`;
      const filePath = fileName;

      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, arrayBuffer, {
          contentType: `image/${fileExt}`,
          upsert: true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        Alert.alert("Error", "Failed to update profile");
        return;
      }

      const { error: dbError } = await supabase
        .from("profile")
        .update({ avatar_url: filePath })
        .eq("id", user.id);

      if (dbError) {
        console.error("DB update error:", dbError);
        Alert.alert("Error", "Failed to update profile.");
        return;
      }

      fetchProfilePicture();
      Alert.alert("Success", "Profile picture updated.");
    } catch (error) {
      console.error("Upload exception:", error);
      Alert.alert("Error", "Unexpected error occurred.");
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissions required",
          "Permission to access photos is required to upload a profile picture"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const uri = result.assets?.[0]?.uri ?? (result as any).uri;
        if (uri) uploadProfilePicture(uri);
      }
    } catch (error) {
      console.error("Image pick error", error);
    }
  };

  const changeEmail = async () => {
    const { error } = await supabase
      .from("profile")
      .update({ email })
      .eq("id", user?.id)
      .select();

    if (error) {
      console.error("Error changing your email", error);
    }

    if (email) {
      setEmail(email);
    }
  };

  const onSave = () => {
    changeEmail();
    updatePassword();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    return;
  };

  const onLogout = async () => {
    try {
      if (signOut) {
        Alert.alert("Logged Out", "You have been logged out successfully.");
        router.replace("/pages/Landing");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An unexpected error occurred during logout.");
    }
  };

  const openCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissions required",
          "Permission to access camera is required to take a photo"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const uri = result.assets?.[0]?.uri ?? (result as any).uri;
        if (uri) uploadProfilePicture(uri);
      }
    } catch (error) {
      console.error("Camera error", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={accountSettingsStyles.container}>
          <View style={accountSettingsStyles.profileContainer}>
            <Image
              source={{ uri: imageUri! }}
              style={accountSettingsStyles.profileImage}
            />
            <TouchableOpacity style={accountSettingsStyles.editIcon}>
              <Ionicons
                name="camera"
                size={18}
                color={"white"}
                onPress={openCamera}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={accountSettingsStyles.uploadButton}
            onPress={pickImage}
          >
            <Text style={accountSettingsStyles.uploadText}>
              Upload New Photo
            </Text>
          </TouchableOpacity>

          <View style={accountSettingsStyles.inputGroup}>
            <Text style={accountSettingsStyles.label}>Your email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={accountSettingsStyles.input}
              placeholder="user@mail.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          <View style={[accountSettingsStyles.sectionHeader]}>
            <Text style={accountSettingsStyles.sectionTitle}>
              Change Password
            </Text>
            <Text style={accountSettingsStyles.sectionNote}>
              Leave blank if you don&apos;t want to change your password
            </Text>
          </View>

          <View style={accountSettingsStyles.inputGroup}>
            <Text style={accountSettingsStyles.label}>New Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={accountSettingsStyles.input}
              placeholder="New password"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          <View style={accountSettingsStyles.inputGroup}>
            <Text style={accountSettingsStyles.label}>
              Confirm New Password
            </Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={accountSettingsStyles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
            <Text style={{ color: color, fontSize: 12, fontWeight: "bold" }}>
              {message}
            </Text>
          </View>

          <TouchableOpacity
            style={accountSettingsStyles.saveButton}
            onPress={onSave}
          >
            <Text style={accountSettingsStyles.saveText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={accountSettingsStyles.logoutButton}
            onPress={onLogout}
          >
            <Text style={accountSettingsStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
