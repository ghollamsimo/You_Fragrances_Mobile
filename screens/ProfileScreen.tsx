import {useEffect, useState} from "react"
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useNavigation} from "@react-navigation/native"
import Ionicons from "react-native-vector-icons/Ionicons"
import {jwtDecode} from "jwt-decode"
import MyReviewsModal from "../modals/MyReviewsModal"
import LoginScreen from "./auth/LoginScreen"
import MyFollowingModal from "../modals/MyFollowingModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/Store";
import {logout} from "../redux/slices/AuthSlice";

const ProfileScreen = () => {
    const navigation = useNavigation()
    const [auth, setAuth] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const [modalVisible, setModalVisible] = useState(false)
    const [followVisible, setFollowVisible] = useState(false)
    const token = useSelector((state: RootState) => state.auth.token);
    const [tokenFromAsync, setTokenFromAsync] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedToken = token || (await AsyncStorage.getItem("token"));

                if (storedToken) {
                    const decodedToken = jwtDecode(storedToken);
                    setUser(decodedToken);
                    setTokenFromAsync(storedToken);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setUser(null);
            }
        };

        fetchUserData();
    }, [token]); 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.welcomeContainer}>
                    {token && user ? (
                        <View style={styles.userContainer}>
                            <Image source={{ uri: user?.image?.replace("127.0.0.1", "192.168.1.116") }} style={styles.avatar} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.userEmail}>{user.email}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.welcomeContent}>
                            <Text style={styles.welcomeTitle}>Welcome to You Fragrances!</Text>
                            <Text style={styles.welcomeSubtitle}>Sign in to your account.</Text>
                            <TouchableOpacity style={styles.appleButton} onPress={() => setAuth(true)}>
                                <Text style={styles.appleButtonText}>Sign in with Auth</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.menuContainer}>

                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("support")}>
                        <View style={styles.menuLeft}>
                            <Ionicons name="help-buoy-outline" size={24} color="#A8C8B8" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Support</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#A8C8B8" />
                    </TouchableOpacity>


                    {(token || tokenFromAsync) && (
                    <TouchableOpacity style={styles.menuItem} onPress={() => setFollowVisible(true)}>
                        <View style={styles.menuLeft}>
                            <Ionicons name="person-outline" size={24} color="#A8C8B8" style={styles.menuIcon} />
                            <Text style={styles.menuText}>My following Brands</Text>
                        </View>
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2534/2534211.png" }}
                            style={styles.diamondIcon}
                        />
                    </TouchableOpacity>
                        )}
                </View>



                {(token || tokenFromAsync) && (
                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={async () => {
                            await dispatch(logout());
                            setUser(null);
                            setTokenFromAsync(null);
                        }}
                    >
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>


            {modalVisible && <MyReviewsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
            {auth && <LoginScreen modalVisible={auth} setModalVisible={setAuth} />}

            {followVisible && <MyFollowingModal modalVisible={followVisible} setModalVisible={setFollowVisible} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "700",
    },
    scrollView: {
        flex: 1,
    },
    welcomeContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    welcomeContent: {
        alignItems: "center",
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    userContainer: {
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    userInfo: {
        alignItems: "center",
    },
    userName: {
        fontSize: 22,
        fontWeight: "600",
    },
    userEmail: {
        fontSize: 14,
        color: "#999",
        marginTop: 5,
    },
    appleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        width: 250,
    },
    buttonIcon: {
        marginRight: 8,
    },
    appleButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    menuContainer: {
        paddingTop: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuIcon: {
        marginRight: 15,
    },
    menuText: {
        fontSize: 16,
        fontWeight: "500",
    },
    menuRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    tagContainer: {
        backgroundColor: "#A8C8B8",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 10,
    },
    tagText: {
        color: "white",
        fontSize: 12,
        fontWeight: "600",
    },
    diamondIcon: {
        width: 20,
        height: 20,
    },
    followContainer: {
        alignItems: "center",
        paddingVertical: 25,
    },
    followText: {
        fontSize: 18,
        fontWeight: "600",
    },
    signOutButton: {
        marginHorizontal: 20,
        marginBottom: 30,
        backgroundColor: "#f8f8f8",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    signOutText: {
        color: "#ff3b30",
        fontSize: 16,
        fontWeight: "600",
    },
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        backgroundColor: "#fff",
        paddingBottom: 20,
        paddingTop: 10,
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
        color: "#000",
    },
    tabTextActive: {
        fontSize: 12,
        marginTop: 4,
        color: "#6B9080",
        fontWeight: "500",
    },
    cameraButton: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    cameraCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#6B9080",
        alignItems: "center",
        justifyContent: "center",
    },
})

export default ProfileScreen

