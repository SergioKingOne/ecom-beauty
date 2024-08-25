import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { ThemedView } from "@/components/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/app/(auth)/AuthContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DB_URL = process.env.EXPO_PUBLIC_DB_URL || "http://localhost:8080";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = React.useCallback(async () => {
    setLoading(true);

    try {
      await login(emailAddress, password);
      router.replace("/");
    } catch (err: any) {
      console.error("Login error:", err.message);
      Alert.alert(
        "Error",
        "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [emailAddress, password, login, router]);

  const [fontsLoaded] = useFonts({
    Glorious: require("@/assets/fonts/GLORIOUS.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedIcon name="chevron-back" size={32} />
      </TouchableOpacity>

      <ThemedText style={styles.title}>Login</ThemedText>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#818189"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#818189"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.signinContainer}
        onPress={() => router.push("/reset")}
      >
        <Text style={styles.signinText}>Forgot your password? </Text>
        <Text style={styles.signinLink}>Reset it</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.signupButton, loading && styles.disabledButton]}
        onPress={onSignInPress}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </Text>
      </TouchableOpacity>
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Or sign in with social account</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <ThemedIcon name="logo-google" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <ThemedIcon name="logo-facebook" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontFamily: "Glorious",
    fontSize: 38,
    marginBottom: 80,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    paddingVertical: 18,
    marginBottom: 18,
    fontSize: 19,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
    elevation: 2,
  },
  signupButton: {
    backgroundColor: "#f29c1d",
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
  socialContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 36,
  },
  socialText: {
    color: "#818189",
    marginTop: 12,
    fontSize: 16,
  },
  socialButtons: {
    flexDirection: "row",
    marginTop: 24,
  },
  socialButton: {
    marginHorizontal: 24,
    padding: 6,
  },
  signinContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  signinText: {
    color: "#818189",
    fontSize: 16,
  },
  signinLink: {
    color: "#f29c1d",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
