import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const barMaxWidth = width * 0.8;



const NoteModal = ({ modalVisible, setModalVisible }) => {
  const fragranceNotes = [
    { name: 'amber', color: '#D35400', width: '100%' },
    { name: 'balsamic', color: '#B59E8B', width: '85%' },
    { name: 'aromatic', color: '#76C5B7', width: '75%' },
    { name: 'woody', color: '#8B7355', width: '90%' },
    { name: 'salty', color: '#E8E8E8', width: '65%' },
    { name: 'smoky', color: '#95A5A6', width: '80%' },
    { name: 'warm spicy', color: '#E9967A', width: '70%' },
    { name: 'sweet', color: '#FFB6C1', width: '60%' },
  ];
  return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Fragrance Notes</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.notesContainer}>
              {fragranceNotes.map((note, index) => (
                  <View key={index} style={styles.noteRow}>
                    <Text style={styles.noteName}>{note.name}</Text>
                    <View style={styles.barContainer}>
                      <View
                          style={[
                            styles.bar,
                            {
                              backgroundColor: note.color,
                              width: note.width,
                            },
                          ]}
                      ><Text>{note.width}</Text></View>
                    </View>
                  </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  notesContainer: {
    paddingHorizontal: 10,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteName: {
    width: 100,
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  barContainer: {
    flex: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteModal;