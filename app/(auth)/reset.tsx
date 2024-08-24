import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { ThemedView } from "@/components/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/(auth)/AuthContext";
import axios from "axios";

const DB_URL = process.env.EXPO_PUBLIC_DB_URL;

export default function ForgotPassword() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  async function requestReset(e: GestureResponderEvent) {
    e.preventDefault();
    try {
      await axios.post(`${DB_URL}/api/v1/request-reset`, { email });
      setSuccessfulCreation(true);
      setError("");
    } catch (err: any) {
      console.error("Error requesting reset:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred while requesting password reset.");
    }
  }

  async function resetPassword(e: GestureResponderEvent) {
    e.preventDefault();
    try {
      await axios.post(`${DB_URL}/api/v1/reset-password`, { email, code, password });
      Alert.alert("Success", "Your password has been reset. Please log in with your new password.");
      router.replace("/login");
    } catch (err: any) {
      console.error("Error resetting password:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred while resetting your password.");
    }
  }

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

      <ThemedText style={styles.title}>Forgot password</ThemedText>
      {!successfulCreation ? (
        <>
          <ThemedText>
            Please enter your email address. You will receive a code to reset your password.
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#818189"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.signupButton} onPress={requestReset}>
            <Text style={styles.signupButtonText}>SEND CODE</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <ThemedText>
            Please enter the code you received and your new password
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Code"
            placeholderTextColor="#818189"
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            placeholderTextColor="#818189"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.signupButton} onPress={resetPassword}>
            <Text style={styles.signupButtonText}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </>
      )}
      {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}
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
    marginBottom: 16,
    marginTop: 18,
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
    marginTop: 24,
    alignItems: "center",
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});