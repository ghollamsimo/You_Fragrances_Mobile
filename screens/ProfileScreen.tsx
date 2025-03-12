import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import ProfileNavbar from "../components/ProfileNavbar";
import MyReviewsModal from "../modals/MyReviewsModal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./auth/LoginScreen";
import {jwtDecode} from "jwt-decode";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [auth, setAuth] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            console.log("Fetched Token:", storedToken);
            if (storedToken) {
                setToken(storedToken);
                const decodedToken = jwtDecode(storedToken);
                setUser(decodedToken);
            } else {
                setToken(null);
                setUser(null);
            }
        };

        fetchToken();
    }, []);
    console.log('bb', user?.image)
    const handleSignIn = async () => {
        try {
            if (token) {
                navigation.navigate('Profile');
            } else {
                setAuth(true);
            }
        } catch (error) {
            console.error('Error during sign-in: ', error);
        }
    };

    return (
        <View style={{ height: "100%" }}>
            <ProfileNavbar />
            <View style={{ marginTop: 10, paddingVertical: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 10, paddingVertical: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {user ? (
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={{ uri: user?.image?.replace('127.0.0.1', '192.168.1.116') }}
                                style={styles.avatar}
                            />
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>{user.name}</Text>
                                <Text style={{ textAlign: 'center', color: '#cccccc', marginTop: 10 }}>{user.email}</Text>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.appleButton} onPress={() => setAuth(true)}>
                            <Text style={styles.appleButtonText}>Sign in You Fragrances</Text>
                        </TouchableOpacity>
                    )}
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
                onPress={() => navigation.navigate('knowledgeScreen')}
            >
                <Ionicons name="information-circle" style={styles.icons} size={20} />
                <Text style={styles.buttonText}>Terms, notes & general knowledge</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.openButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="star" style={styles.icons} size={20} />
                <Text style={styles.buttonText}>My favorite perfume</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.openButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="notifications" style={styles.icons} size={20} />
                <Text style={styles.buttonText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.openButton}
                onPress={() => AsyncStorage.removeItem('token')}
            >
                <Ionicons name="settings" style={styles.icons} size={20} />
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

            {modalVisible && <MyReviewsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            {auth && <LoginScreen modalVisible={auth} setModalVisible={setAuth} />}
        </View>
    );
};

export default ProfileScreen;

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
        },
        appleButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#3E7796',
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,

        },
        appleIcon: {
            width: 20,
            height: 20,
            marginRight: 10,
        },
        appleButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
    }
)