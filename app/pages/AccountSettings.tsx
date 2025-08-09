import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import accountSettingsStyles from "../styles/accountSettingStyles";

export default function AccountSettings() {
  const [imageUri, setImageUri] = useState<string>(
    "../../assets/images/wallet-icon.jpeg"
  );
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPasswords, setShowPasswords] = useState<boolean>(false);

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
        if (uri) setImageUri(uri);
      }
    } catch (error) {
      console.error("Image pick error", error);
    }
  };

  const onSave = () => {
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        Alert.alert(
          "Passwords do not match",
          "New password and confirm must match"
        );
        return;
      }
      if (!currentPassword) {
        Alert.alert(
          "Current password required",
          "Enter your current password to change it"
        );
        return;
      }
    }

    console.log({
      imageUri,
      currentPassword,
      newPassword,
    });

    Alert.alert(
      "Saved",
      "Changes saved locally (stub). Hook this to your API."
    );
  };

  const onLogout = () => {
    Alert.alert("Logout", "This will log you out (stub).");
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
        if (uri) setImageUri(uri);
      }
    } catch (error) {
      console.error("Camera error", error)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={accountSettingsStyles.container}
    >
      <View style={accountSettingsStyles.content}>
        <ScrollView
          contentContainerStyle={accountSettingsStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={accountSettingsStyles.profileContainer}>
            <Image
              source={{ uri: imageUri }}
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

          <View style={[accountSettingsStyles.sectionHeader]}>
            <Text style={accountSettingsStyles.sectionTitle}>
              Change Password
            </Text>
            <Text style={accountSettingsStyles.sectionNote}>
              Leave blank if you don&apos;t want to change your password
            </Text>
          </View>

          <View style={accountSettingsStyles.inputGroup}>
            <Text style={accountSettingsStyles.label}>Current Password</Text>
            <View style={accountSettingsStyles.passwordRow}>
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={[
                  accountSettingsStyles.input,
                  accountSettingsStyles.passwordInput,
                ]}
                placeholder="Current password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPasswords}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={accountSettingsStyles.inputGroup}>
            <Text style={accountSettingsStyles.label}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              style={accountSettingsStyles.input}
              placeholder="New password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPasswords}
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
              secureTextEntry={!showPasswords}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={accountSettingsStyles.saveButton}
            onPress={onSave}
          >
            <Text style={accountSettingsStyles.saveText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={accountSettingsStyles.logoutButton}
            onPress={onLogout}
          >
            <Text style={accountSettingsStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
