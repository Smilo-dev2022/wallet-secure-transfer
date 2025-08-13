import { StyleSheet } from "react-native";

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0084ff",
    backgroundColor: "#37539fff"
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  loginButton: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  loginText: {
    color: "#000000ff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 10,
  },
  signupText: {
    color: "#ffffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default landingStyles
