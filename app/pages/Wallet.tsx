import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import walletStyles from "../styles/walletStyles";
import Footer from "../components/Footer";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function Wallet() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const { user } = useAuth();

    useEffect(() => {
    if (user) {
      fetchProfilePicture();
      fetchName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProfilePicture = async () => {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("avatar_url")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.error("Error fetching profile picture", error);
    }

    if (profile?.avatar_url) {
      const { data: signedData, error: signedError } = await supabase.storage
        .from("profile-pictures")
        .createSignedUrl(profile.avatar_url, 60 * 60);

      if (signedError || !signedData) {
        console.error("Signed error", signedError);
        return;
      }

      setImageUri(signedData.signedUrl);
    }
  };

  const fetchName = async () => {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("full_name")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.error("Error fetching user name", error);
    }

    if (profile?.full_name) {
      setName(profile.full_name);
    }
  };

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
          source={{ uri: imageUri! }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: "#F97316",
            backgroundColor: "#fff",
          }}
        />
          <Text style={walletStyles.userName}>Hello, {name ?? <ActivityIndicator size="small" color="#F97316"/>}</Text>
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
