import { StyleSheet } from "react-native";

const walletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37539fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#F97316",
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },

  walletCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    marginBottom: 40,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    alignItems: "center",
    width: 330,
    maxWidth: 330
  },
  walletLabel: {
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 6,
  },
  walletAmount: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#F97316",
  },

  transactionsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  transaction_sent: {
    backgroundColor: "#F97316",
  },
  transaction_received: {
    backgroundColor: "#22C55E",
  },
  transaction_bill: {
    backgroundColor: "#6366F1",
  },
  transaction_topup: {
    backgroundColor: "#3B82F6",
  },

  transactionLabel: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  transactionDate: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
  transactionAmount: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  scrollContainer: {
  flex: 1,
  backgroundColor: "#37539fff",
  paddingHorizontal: 20,
  paddingTop: 50,
},

});

export default walletStyles