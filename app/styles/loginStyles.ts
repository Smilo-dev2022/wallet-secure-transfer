import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0082ff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
    centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
    loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#333",
  },
  loginBold: {
    fontWeight: "bold"
  }
});

export default loginStyles