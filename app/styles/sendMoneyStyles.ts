import { StyleSheet } from "react-native";

const sendMoneyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539F",
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#37539F",
    alignItems: "center",
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    maxWidth: 480,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#37539F",
    marginBottom: 8,
  },
  picker: {
    height: 44,
    width: "100%",
    marginBottom: 12,
    color: "#37539F",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
    marginBottom: 12,
  },
  sendBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  sendBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default sendMoneyStyles;
