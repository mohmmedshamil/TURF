import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import BackgroundImage from "../backgroundImage";
import CardItems from "./cardItems";

const ProjectDashboard = () => {
  return (
    <BackgroundImage>
      <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
        <View style={styles.header}>
        <View style={styles.search}>
          <FontAwesome name="search" size={13} color="#758694" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            placeholderTextColor= "#758694"

          />
          </View>
          <TouchableOpacity style={styles.createProject}><Text style={{color: "#DC5F00",fontWeight: "500"}} onPress={()=> router.replace("/admin/createProject")}>Create Project</Text></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
          <CardItems />
        </ScrollView>
      </SafeAreaView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        gap: 20
      },
      search: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(31, 31, 31, 0.7)',
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        gap: 5,
      },
      createProject: {
        backgroundColor: 'rgba(238, 230, 238, 1)',
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        justifyContent: "center",
      },
      icon: {
        marginLeft: 10,
        marginTop: 13,
      },
      input: {
        flex: 1,
        fontSize: 13,
        width: 300,
        color: "#758694",
      },
});

export default ProjectDashboard;
