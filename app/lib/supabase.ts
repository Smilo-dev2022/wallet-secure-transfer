import { AppState, Platform, Alert } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

const supabaseUrl = "https://ezlffftgfnhagzrnhtjn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bGZmZnRnZm5oYWd6cm5odGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTM4MjIsImV4cCI6MjA2OTI2OTgyMn0.tdFYzYcLf6pggfeglhcOG1Wf-9OPfdhevwc0Vl9C64c";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}

export async function verifyRecipient(identifier: string, identifierType: string) {
  try {
    const { data, error } = await supabase.functions.invoke('verify-recipient', {
      body: {
        identifier: identifier,
        identifierType: identifierType
      }
    })

    if (error) throw error
    return data
    // Contains {exists: boolean, userId?: string, fullName?: string}
  } catch (error: any) {
    Alert.alert('Verification error:', error)
    throw error
  }
}

export async function transferMoney(id: string, emailOrPhone: string, recipientIdentifierType:string, amount: number, desc?: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return;
  }
  const { data, error } = await supabase.functions.invoke("transfer-money", {
    body: {
      senderId: id,
      recipientIdentifier: emailOrPhone,
      recipientIdentifierType: recipientIdentifierType, // or phone
      amount: amount,
      description: desc
    },
  });

  if (error) {
    Alert.alert('Error', error.message)
  } else {
    Alert.alert("Transfer sucessful:", data)
  }
}

export default supabase;
