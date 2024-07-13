import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { ThemedView } from "@/components/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export default function Signup({ onSignup }: { onSignup: () => void }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({ emailAddress, password });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (error: any) {
      console.error("Error signing up:", error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (error: any) {
      console.error("Error verifying email:", error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  const navigation = useNavigation<NavigationProp>();

  const [fontsLoaded] = useFonts({
    Glorious: require("@/assets/fonts/GLORIOUS.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <ThemedIcon name="chevron-back" size={32} />
      </TouchableOpacity>

      <ThemedText style={styles.title}>Sign up</ThemedText>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#818189"
        />
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
        {pendingVerification && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Verification code"
              placeholderTextColor="#818189"
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity
              style={styles.signupButton}
              onPress={onVerifyPress}
            >
              <Text style={styles.signupButtonText}>VERIFY</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity
        style={styles.signinContainer}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.signinText}>Already have an account? </Text>
        <Text style={styles.signinLink}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={onSignUpPress}>
        <Text style={styles.signupButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Or sign up with social account</Text>
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
  socialIcon: {
    width: 48,
    height: 48,
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
});
