import { Text, View, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable style={styles.button}>
        <Link href={"./SplashPage"} style={styles.link}>
          <Text style={styles.buttonText}>Go to Splash</Text>
        </Link>
      </Pressable>
      <Pressable style={styles.button}>
        <Link href={"/Login"} style={styles.link}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </Link>
      </Pressable>
      <Pressable style={styles.button}>
        <Link href={"/Signup"} style={styles.link}>
          <Text style={styles.buttonText}>Go to Signup</Text>
        </Link>
      </Pressable>
      <Pressable style={styles.button}>
        <Link href={"/Dashboard"} style={styles.link}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </Link>
      </Pressable>
      <Pressable style={styles.button}>
        <Link href={"/About"} style={styles.link}>
          <Text style={styles.buttonText}>Go to About</Text>
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textDecorationLine: "underline",
    padding: 4,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding: 6,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
});
