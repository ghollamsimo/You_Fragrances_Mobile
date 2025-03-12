import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const MyReviewsModal = ({ modalVisible, setModalVisible }) => {
    const [data, setData] = useState([]) 
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.modalTitle}>My Reviews</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Ionicons style={styles.buttonText} name='close' size={16} />
                    </TouchableOpacity>
                </View>
                { data &&data.length === 0 ? (
                    <View  style={{}}>
                        <Text>Hello</Text>
                    </View>
                ): (
                    <>
                     {data.map((_, index) => (
                <Text key={index} style={styles.listItem}>
                  {index}
                </Text>
              ))}
                    </>
                )}
             
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyReviewsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  modalContent: {
    flex: 1,
    maxHeight: '55%', 
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: '#d9dadb',
    padding: 7,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
});
