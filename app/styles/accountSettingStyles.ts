import { StyleSheet } from "react-native";

const accountSettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539fff",
  },
  content: {
    paddingBottom: 10,
    alignItems: "center",
  },
  profileContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#F97316",
    backgroundColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#F97316",
    borderRadius: 18,
    padding: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  uploadButton: {
    marginTop: 8,
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  uploadText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },

  inputGroup: {
    width: "100%",
    marginBottom: 14,
  },
  label: {
    color: "white",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 14,
    color: "#1E3A8A",
  },

  sectionHeader: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  sectionNote: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 4,
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  eyeBtn: {
    marginLeft: 8,
    padding: 6,
  },

  saveButton: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 18,
    width: "100%",
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
    width: "100%",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  scrollContent: {
  padding: 1,
  alignItems: "center",
  backgroundColor: "#37539fff",
}
});

export default accountSettingsStyles