import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Signup({ onSignup }: { onSignup: () => void }) {
  const [fontsLoaded] = useFonts({
    Glorious: require("@/assets/fonts/GLORIOUS.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#818189"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#818189"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#818189"
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={onSignup}>
        <Text style={styles.signupButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Or sign up with social account</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.signinContainer}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <Text style={styles.signinLink}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdfbfb",
  },
  title: {
    fontFamily: "Glorious",
    fontSize: 32,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fdfbfb",
    borderColor: "#818189",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "#f29c1d",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  socialText: {
    color: "#818189",
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: "row",
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  signinContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signinText: {
    color: "#818189",
  },
  signinLink: {
    color: "#f29c1d",
  },
});
