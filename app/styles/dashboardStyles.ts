import { StyleSheet } from "react-native";

const dashBoardStyles = StyleSheet.create({
  container: {
    // backgroundColor: "#1E3A8A",
    backgroundColor: "#37539fff",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    width: "100%",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E3A8A",
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

  transactionDate: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center',
    width: "90%",
    marginTop: 5,
    marginBottom: 50
  },

  cardButton: {
    backgroundColor: "white",
    width: "42%",
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default dashBoardStyles;
