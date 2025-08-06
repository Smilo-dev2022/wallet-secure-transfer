import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, Text, View } from "react-native";
import dashBoardStyles from "./styles/dashboardStyles";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: "#37539fff" }}>
      <View style={dashBoardStyles.header}></View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={dashBoardStyles.container}>
          <View></View>
          <View style={dashBoardStyles.profilePicture}>
            <MaterialCommunityIcons
              name="face-man-profile"
              size={48}
              color="black"
            />
          </View>

          <Text style={dashBoardStyles.username}>Garvin Chimone</Text>

          <View style={dashBoardStyles.titleContainer}>
            <Text style={dashBoardStyles.titles}>Wallet</Text>
          </View>

          <View style={dashBoardStyles.balanceCard}>
            <Text style={dashBoardStyles.balance}>R 200.00</Text>
          </View>

          <View style={dashBoardStyles.titleContainer}>
            <Text style={dashBoardStyles.titles}>Transaction History</Text>
            <Text style={dashBoardStyles.subTitle}>Last 30 days</Text>
          </View>

          <View style={dashBoardStyles.transactionList}>
            <View style={dashBoardStyles.transactionItem}>
              <Text style={dashBoardStyles.transactionText}>
                Sent to John - R50.00
              </Text>
              <Text style={dashBoardStyles.transactionDate}>2025-08-01</Text>
            </View>
            <View style={dashBoardStyles.transactionItem}>
              <Text style={dashBoardStyles.transactionText}>
                Received from Lisa - R100.00
              </Text>
              <Text style={dashBoardStyles.transactionDate}>2025-08-03</Text>
            </View>
            <View style={dashBoardStyles.transactionItem}>
              <Text style={dashBoardStyles.transactionText}>
                Paid Electricity - R250.00
              </Text>
              <Text style={dashBoardStyles.transactionDate}>2025-08-02</Text>
            </View>
            <View style={dashBoardStyles.transactionItem}>
              <Text style={dashBoardStyles.transactionText}>
                Top-up - R300.00
              </Text>
              <Text style={dashBoardStyles.transactionDate}>2025-07-30</Text>
            </View>
            <View style={dashBoardStyles.transactionItem}>
              <Text style={dashBoardStyles.transactionText}>
                Sent to Mum - R150.00
              </Text>
              <Text style={dashBoardStyles.transactionDate}>2025-08-04</Text>
            </View>
          </View>

          <View style={dashBoardStyles.titleContainer}>
            <Text style={dashBoardStyles.titles}>Bills</Text>
          </View>
        </View>
      </ScrollView>
      <View style={dashBoardStyles.footer}>
        <View style={dashBoardStyles.actionItem}>
          <Feather name="settings" size={24} color="orange" />
          <Text style={dashBoardStyles.footerText}>Settings</Text>
        </View>

        <View style={dashBoardStyles.actionItem}>
          <AntDesign name="qrcode" size={24} color="orange" />
          <Text style={dashBoardStyles.footerText}>QR Code</Text>
        </View>

        <View style={dashBoardStyles.actionItem}>
          <AntDesign name="arrowright" size={24} color="orange" />
          <Text style={dashBoardStyles.footerText}>Send</Text>
        </View>
      </View>
    </View>
  );
}
