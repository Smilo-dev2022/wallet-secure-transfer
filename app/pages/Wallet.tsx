import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import walletStyles from "../styles/walletStyles";
import Footer from "../components/Footer";
import supabase from "../lib/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Wallet() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if(!data.session) {
        router.replace("/auth/Login")
      }
    }

    checkAuth()
  })

  return (
    <View style={{ flex: 1, backgroundColor: "#37539fff" }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
          paddingTop: 20,
          paddingHorizontal: 16,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >

        <View style={walletStyles.userInfo}>
          <Image
            source={require("../../assets/images/wallet-icon.jpeg")}
            style={walletStyles.avatar}
          />
          <Text style={walletStyles.userName}>Hello, Garvin Chimone</Text>
        </View>

        <View style={walletStyles.walletCard}>
          <Text style={walletStyles.walletLabel}>Wallet Balance</Text>
          <Text style={walletStyles.walletAmount}>R 1,200.50</Text>
        </View>

        <Text style={walletStyles.transactionsTitle}>Last 5 Transactions</Text>

        <View
          style={[walletStyles.transactionItem, walletStyles.transaction_sent]}
        >
          <Ionicons
            name="arrow-up-circle-outline"
            size={28}
            color="white"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={walletStyles.transactionLabel}>Sent to John</Text>
            <Text style={walletStyles.transactionDate}>2025-08-01</Text>
          </View>
          <Text style={walletStyles.transactionAmount}>- R 50.00</Text>
        </View>

        <View
          style={[
            walletStyles.transactionItem,
            walletStyles.transaction_received,
          ]}
        >
          <Ionicons
            name="arrow-down-circle-outline"
            size={28}
            color="white"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={walletStyles.transactionLabel}>
              Received from Lisa
            </Text>
            <Text style={walletStyles.transactionDate}>2025-08-03</Text>
          </View>
          <Text style={walletStyles.transactionAmount}>+ R 100.00</Text>
        </View>

        <View
          style={[walletStyles.transactionItem, walletStyles.transaction_bill]}
        >
          <Ionicons
            name="receipt-outline"
            size={28}
            color="white"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={walletStyles.transactionLabel}>Paid Electricity</Text>
            <Text style={walletStyles.transactionDate}>2025-08-02</Text>
          </View>
          <Text style={walletStyles.transactionAmount}>- R 250.00</Text>
        </View>

        <View
          style={[walletStyles.transactionItem, walletStyles.transaction_topup]}
        >
          <Ionicons
            name="add-circle-outline"
            size={28}
            color="white"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={walletStyles.transactionLabel}>Top-up</Text>
            <Text style={walletStyles.transactionDate}>2025-07-30</Text>
          </View>
          <Text style={walletStyles.transactionAmount}>+ R 300.00</Text>
        </View>

        <View
          style={[walletStyles.transactionItem, walletStyles.transaction_sent]}
        >
          <Ionicons
            name="arrow-up-circle-outline"
            size={28}
            color="white"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={walletStyles.transactionLabel}>Sent to Mum</Text>
            <Text style={walletStyles.transactionDate}>2025-08-04</Text>
          </View>
          <Text style={walletStyles.transactionAmount}>- R 150.00</Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
