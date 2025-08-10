import { StyleSheet } from "react-native";

const sendMoneyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539F",
    padding: 20,
  },
  backBtn: {
    marginBottom: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#37539F",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
  sendBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  sendBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default sendMoneyStyles