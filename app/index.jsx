import React from "react";
import { UserProvider } from "./store/userContext";
import { ImageBackground, StyleSheet } from "react-native";
import LoginPage from "./loginPage";
const backgroundImage = require("../assets/images/background.png");

export default function Index() {
  return (
    <UserProvider>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <LoginPage />
      </ImageBackground>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
