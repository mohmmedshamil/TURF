import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userData = await fetchUserData(user.phoneNumber);
                setUser(userData);
            }
            setInitializing(false);
        });

        return subscriber;
    }, []);

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
        <UserContext.Provider value={{ user, setUser, initializing }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
