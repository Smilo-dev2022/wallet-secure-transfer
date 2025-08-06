import { StyleSheet } from "react-native";

const dashBoardStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1E3A8A",
    backgroundColor: "#37539fff",
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 50,
    width: '100%',
  },

  balanceCard: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#F97316",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 30,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E3A8A",
  },

  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F97316",
    marginTop: 10,
  },

  actionsContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
  },

  actionText: {
    fontSize: 14,
    marginTop: 5,
    color: "white",
  },

  button: {
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  link: {
    color: "#F97316",
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },

  titles: {
    color: "#fff",
    fontSize: 30,
  },
  titleContainer: {
    width: "85%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginBottom: 9,
    marginTop: 12,
  },
  subTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 2,
  },
  transactionList: {
    width: "85%",
    marginBottom: 20,
  },

  transactionItem: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#F97316",
  },

  transactionText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "500",
  },

  transactionDate: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  header: {
    height: 50,
    backgroundColor: "#354e90ff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  footer: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 6,
  },
  footerText: {
    fontSize: 12,
    marginTop: 5,
    color: "black",
  },
});

export default dashBoardStyles;
