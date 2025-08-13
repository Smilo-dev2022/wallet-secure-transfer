import { StyleSheet } from "react-native";

const verifyPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539FFF",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  content: {
    width: "100%",
    maxWidth: 480,
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 320,
    marginBottom: 24,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#1E3A8A",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 14,
    color: "#1E3A8A",
    marginBottom: 10
  },
  verifyButton: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    maxWidth: 480,
    marginBottom: 16,
  },
  verifyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  resendText: {
    color: "#E5E7EB",
    fontSize: 14,
  },
  resendLink: {
    color: "#F97316",
    fontWeight: "600",
    marginLeft: 4,
  },
  errorText: {
    color: "#EB5757",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});

export default verifyPageStyles;
