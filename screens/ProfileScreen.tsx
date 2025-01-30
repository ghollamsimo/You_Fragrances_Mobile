import React, { useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import { View, StyleSheet, Image } from "react-native"
import ProfileNavbar from "../components/ProfileNavbar"
import MyReviewsModal from "../modals/MyReviewsModal"
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
            <View style={{height: "100%"}}>
                <ProfileNavbar/>
                <View style={{marginTop: 10,  paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View>
                          <Image
                                  source={{uri: 'https://static.wikia.nocookie.net/gorillatag/images/3/33/SnowOwlMaskSprite.png/revision/latest/thumbnail/width/360/height/450?cb=20230127222407'}}
                                  style={styles.avatar}
                                /> 
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 24, fontWeight: '700'}}>Mohamed Ghollam</Text>
                        <Text style={{textAlign:'center', color: '#cccccc', marginTop: 10}}>ghollamsimo@gmail.com</Text>
                    </View>
                </View>

                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.openButton} 
                        onPress={() => setModalVisible(true)}
                      >
                        <Ionicons name="star" style={styles.icons} size={20} />
                        <Text style={styles.buttonText}>My Reviews</Text>
                      </TouchableOpacity>
                      {modalVisible && <MyReviewsModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
            </View>
    )
}
export default ProfileScreen

const styles = StyleSheet.create(
    {
        avatar: {
            width: 130,
            height: 130,
            borderRadius: 100,
          },
          openButton: {
            padding: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor:'#d9dadb', 
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          },
          icons:{
            color: '#d9dadb',
          },
          buttonText: {
            fontSize: 16,
            fontWeight: '600',
          }
    }
)