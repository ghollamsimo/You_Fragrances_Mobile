import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import NoteModal from "../modals/NoteDetailsModal"; // Assuming this is the modal you want to use

const Notes = ({ topNotes, middleNotes, baseNotes }) => {
  const [note, setNote] = useState(null);  // Update to store selected note object
  const [expanded, setExpanded] = useState(false);  // New state for toggling expand
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Combine all notes
  const ingredients = [
    ...topNotes.map((note) => ({ ...note, risk: 'Top Notes' })),
    ...middleNotes.map((note) => ({ ...note, risk: 'Middle Notes' })),
    ...baseNotes.map((note) => ({ ...note, risk: 'Base Notes' })),
  ];

  const ingredientsToShow = expanded ? ingredients : ingredients.slice(0, 2);

  return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Ingredients</Text>
            {ingredients.length > 2 && (
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.seeAll}>{expanded ? 'See Less' : 'See All'}</Text>
                </TouchableOpacity>
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {ingredientsToShow.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => setNote(item)}  // Set the clicked ingredient to show in the modal
                >
                  <View style={styles.ingredientRow}>
                    <View style={styles.textContainer}>
                      <Text style={styles.ingredientName}>{item.name}</Text>
                      <Text style={styles.riskText}>{item.risk}</Text>
                    </View>
                    <Image
                        source={{ uri: item.image?.replace('127.0.0.1', '192.168.1.116') }}
                        style={{ width: 50, height: 50, borderRadius: 5 }}
                    />
                  </View>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Modal triggered by clicking "See All" */}
        {expanded && (
            <NoteModal modalVisible={expanded} setModalVisible={setExpanded} ingredients={ingredients} />
        )}

        {note && <NoteModal modalVisible={note} setModalVisible={setNote} ingredient={note} />}
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
