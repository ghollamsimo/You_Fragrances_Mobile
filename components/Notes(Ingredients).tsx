import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NoteDetails from "../modals/NoteDetailsModal";

const Notes = () => {
  const [note, setNote] = useState<boolean>(false)
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const ingredients = [
    { name: "Lime", risk: "Top Notes" },
    { name: "Pink Pepper", risk: "Top Notes" },
    // { name: "Methylparaben", risk: "Moderate risk" },
    // { name: "Phenoxyethanol", risk: "Moderate risk" },
    // { name: "Octocrylene", risk: "Moderate risk" },
    // { name: "Limonene", risk: "Moderate risk" },
  ];

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ingredients</Text>
        <TouchableOpacity onPress={() => setNote(true)}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {ingredients.map((item, index) => (
          <View key={index} style={styles.ingredientRow}>
            <View style={styles.textContainer}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.riskText}>{item.risk}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => setNote(true)}>
              <MaterialIcons name="info-outline" size={24} color="#3E7796" />
            </TouchableOpacity> */}
            <Text>Image of note</Text>
          </View>
        ))}
      </ScrollView>
    </View>
        {note && <NoteDetails modalVisible={note} setModalVisible={setNote} />}
    </>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    padding: 15,
    margin: 15,
    borderWidth: 3,
    borderColor: '#3E7796',
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  seeAll: {
    color: '#3E7796',
    fontWeight: 'bold',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textContainer: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  riskText: {
    color: '#F39C12',
    fontSize: 14,
  },
});
