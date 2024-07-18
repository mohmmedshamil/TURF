import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons"; // Import FontAwesome6 icons as needed
import BackgroundImage from "../backgroundImage";
import { Link, router } from "expo-router";

const data = [
  {
    key: "project",
    label: "Project",
    iconName: "soccer-ball",
    link: "/admin/projectDashboard",
  },
  {
    key: "partners",
    label: "Partners",
    iconName: "user-circle",
    link: "/admin/projectDashboard",
  },
  {
    key: "cashier",
    label: "Cashier",
    iconName: "phone",
    link: "/admin/projectDashboard",
  },
  // Add more items as needed
];

const AdminDashboard = () => {
  const renderItem = ({ item }) => (
    <GridItem
      icon={<FontAwesome6 name={item.iconName} size={30} color="white" />}
      label={item.label}
      link={item.link}
    />
  );

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          numColumns={2} // Number of columns in your grid
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </BackgroundImage>
  );
};

const GridItem = ({ icon, label, link }) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={()=> router.replace(link)}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    width: 150,
    height: 150,
    backgroundColor: "#1f2435",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  label: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
});

export default AdminDashboard;
