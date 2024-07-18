import { PhoneAuthProvider } from "@react-native-firebase/auth";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useUser } from './store/userContext'; // Adjust the path accordingly

const backgroundImage = require("../assets/images/background.png");

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const { phone, confirmation } = useLocalSearchParams();
  const router = useRouter();

  const verifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(JSON.parse(confirmation).verificationId, otp);
      const userCredential = await auth().signInWithCredential(credential);
      const userData = await fetchUserData(userCredential.user.phoneNumber);
      useUser(userData);
      console.log("userCredential", userCredential);
      router.replace('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const fetchUserData = async (phoneNumber) => {
    try {
      const usersRef = firestore().collection('users');
      const querySnapshot = await usersRef.where('phoneNumber', '==', phoneNumber).get();
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>OTP Verification</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          onChangeText={setOtp}
        />
        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpVerificationPage;
