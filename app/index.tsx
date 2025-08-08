import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { View } from "react-native";
import supabase from "./lib/supabase";
import Dashboard from "./pages/Dashboard";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null)

   useEffect(() => {
    supabase.auth.getSession().then(({ data: {session} }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
   }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
        { session && session.user && <Dashboard /> }
    </View>
  );
}