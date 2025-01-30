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
    const [data, setData] = useState([1,1,,1,1,1,1,1,1,1,1]) 
  return (
    <SafeAreaView style={styles.container}>
      {/* Bottom Modal */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  openButton: {
    // backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '50%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  scrollViewContent: {
    paddingVertical: 20,
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
    borderWidth:1,
    borderColor:'#d9dadb',
    padding: 7,
    borderRadius: 50,
    // marginTop: 20,
    alignSelf: 'flex-start',
  },
});
