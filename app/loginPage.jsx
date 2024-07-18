import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { router } from 'expo-router';
import { useUser } from './store/userContext'; // Adjust the path accordingly

const landingPage = require("../assets/images/landingPage.jpg");

function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmation, setConfirmation] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { setUser } = useUser(); // Ensure this is correct

    useEffect(() => {
        const firebaseApp = firestore().app;
        console.log('Firebase app instance:', firebaseApp);
        const db = firestore();
        console.log('Firestore instance:', db);
    }, []);

    const validatePhoneNumber = (number) => {
        const countryCodeRegex = /^\+/;
        if (!countryCodeRegex.test(number)) {
            setErrorMessage('Phone number must include a country code.');
            return false;
        }
        const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneNumberRegex.test(number)) {
            setErrorMessage('Invalid phone number format.');
            return false;
        }
        const localNumber = number.replace(/^\+\d{1,2}/, '');
        if (localNumber.length !== 10) {
            setErrorMessage('Phone number must be exactly 10 digits long.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const sendOtp = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
            return;
        }

        try {
            const userExists = await checkUserExists(phoneNumber);
            if (userExists) {
                // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                // setConfirmation(confirmation);
                const params = { phone: phoneNumber, confirmation: JSON.stringify(confirmation) };
                const queryString = new URLSearchParams(params).toString();
                // router.replace(`/otpVerificationPage?${queryString}`);
                router.replace(`/admin/adminDashboard?${queryString}`);
                console.log("verificationId", confirmation);
            } else {
                setErrorMessage(`User not found. Please contact admin.`);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setErrorMessage("Error sending OTP. Please try again.");
        }
    };

    const checkUserExists = async (phoneNumber) => {
        try {
            const usersRef = firestore().collection('users');
            const querySnapshot = await usersRef.where('phoneNumber', '==', phoneNumber).get();
            console.log("querySnapshots", querySnapshot.docs[0]?.data());
            return !querySnapshot.empty;
        } catch (error) {
            console.error("Error checking user:", error);
            return false;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 1)" />
            <ImageBackground
                source={landingPage}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} />
                <View style={styles.header}>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: 'https://path-to-your-profile-image1.jpg' }} style={styles.profileImage} />
                        <Image source={{ uri: 'https://path-to-your-profile-image2.jpg' }} style={styles.profileImage} />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>For the busy ones,</Text>
                    <Text style={styles.subtitle}>workout from anywhere, anytime.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='+91 Enter your mobile number'
                        keyboardType='phone-pad'
                        onChangeText={setPhoneNumber}
                    />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <TouchableOpacity style={styles.button} onPress={sendOtp}>
                        <Text style={styles.buttonText}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, .7)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    profileContainer: {
        flexDirection: 'row',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 50,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ff6b6b',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginPage;
