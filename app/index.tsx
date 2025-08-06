import { View } from "react-native";
import { useState, useEffect } from "react";
import supabase from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import Dashboard from "./Dashboard";

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
        alignItems: "center",
      }}
    >
      <View>
        { session && session.user && <Dashboard /> }
      </View>
    </View>
  );
}