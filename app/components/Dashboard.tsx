import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Dashboard() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}></View>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.container}>
          <View></View>
          <View style={styles.profilePicture}>
            <MaterialCommunityIcons
              name="face-man-profile"
              size={48}
              color="black"
            />
          </View>

          <Text style={styles.username}>Garvin Chimone</Text>

          <View style={styles.titleContainer}>
            <Text style={styles.titles}>Wallet</Text>
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balance}>R 200.00</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titles}>Transaction History</Text>
            <Text style={styles.subTitle}>Last 30 days</Text>
          </View>

          <View style={styles.transactionList}>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>Sent to John - R50.00</Text>
              <Text style={styles.transactionDate}>2025-08-01</Text>
            </View>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                Received from Lisa - R100.00
              </Text>
              <Text style={styles.transactionDate}>2025-08-03</Text>
            </View>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                Paid Electricity - R250.00
              </Text>
              <Text style={styles.transactionDate}>2025-08-02</Text>
            </View>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>Top-up - R300.00</Text>
              <Text style={styles.transactionDate}>2025-07-30</Text>
            </View>
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>Sent to Mum - R150.00</Text>
              <Text style={styles.transactionDate}>2025-08-04</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <View style={styles.actionItem}>
              <AntDesign name="arrowright" size={28} color="orange" />
              <Text style={styles.actionText}>Send</Text>
            </View>

            <View style={styles.actionItem}>
              <AntDesign name="qrcode" size={28} color="orange" />
              <Text style={styles.actionText}>QR Code</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Feather name="settings" size={40} color="orange" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1E3A8A",
    backgroundColor: "#37539fff",
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F97316",
    marginBottom: 20,
  },

  username: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 30,
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

  actionItem: {
    alignItems: "center",
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
    height: 60,
    backgroundColor: "#354e90ff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  footer: {
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
