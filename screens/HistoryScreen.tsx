import {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/Store";
import {loadPerfumeHistory} from "../redux/slices/PerfumeSlice";
import {getUserFavorites} from "../redux/slices/FavoriteSlice";

const HistoryScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useSelector((state: RootState) => state.perfumes.history);
    const favorite = useSelector((state: RootState) => state.favorites.favoriteUserData)
    console.log('fav', favorite);
    
    const [activeTab, setActiveTab] = useState("Recents");


    const uniqueHistory = Array.from(new Map(history.map((item) => [item._id, item])).values());
    useEffect(() => {
        dispatch(loadPerfumeHistory());
        dispatch(getUserFavorites())
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>History</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "Recents" && styles.activeTab]}
                    onPress={() => setActiveTab("Recents")}
                >
                    <Text style={[styles.tabText, activeTab === "Recents" && styles.activeTabText]}>Recents</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === "Favorites" && styles.activeTab]}
                    onPress={() => setActiveTab("Favorites")}
                >
                    <Text style={[styles.tabText, activeTab === "Favorites" && styles.activeTabText]}>Favorites</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.productList}>
                {activeTab === "Recents" ? (
                    uniqueHistory.length > 0 ? (
                        uniqueHistory.map((perfume) => (
                            <View key={perfume._id} style={styles.productCard}>
                                <Image source={{ uri: perfume.image.replace("127.0.0.1", "192.168.1.116") }} style={styles.productImage} />

                                <View style={styles.productInfo}>
                                    <Text style={styles.brandName}>{perfume.brand.name}</Text>
                                    <Text style={styles.productName}>{perfume.name}</Text>
                                    <View style={[styles.safetyBadge, perfume.averageRating > 3.5 ? styles.highSafety : styles.lowSafety]}>
                                        <Text style={styles.safetyText}>Rating: {perfume.averageRating}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No recent perfumes found.</Text>
                    )
                ) : (
                    favorite.length > 0 ? (
                        favorite.map((favoriteItem) => (
                            <View key={favoriteItem._id} style={styles.productCard}>
                                <Image
                                    source={{ uri: favoriteItem?.image.replace("127.0.0.1", "192.168.1.116") }}
                                    style={styles.productImage}
                                />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{favoriteItem?.name}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Image source={{uri: "https://cdni.iconscout.com/illustration/premium/thumb/perfume-aroma-composition-illustration-download-in-svg-png-gif-file-formats--create-fragrance-maker-beauty-and-fashion-pack-equipment-illustrations-3916230.png"}} style={styles.emptyImage} />
                            <Text style={styles.emptyText}>No favorite perfumes yet.</Text>
                        </View>
                    )
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: "#EEEEEE",
    },
    tabContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 25,
        backgroundColor: "#F5F5F5",
        padding: 5,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#3E7796",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#888888",
    },
    activeTabText: {
        color: "white",
        fontWeight: "bold",
    },
    productList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    productCard: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#d9dadb',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    productInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "center",
    },
    brandName: {
        color: "#999999",
        fontSize: 16,
        marginBottom: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    safetyBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    highSafety: {
        backgroundColor: "#3E7796",
    },
    lowSafety: {
        backgroundColor: "#F0C14B",
    },
    safetyText: {
        color: "white",
        fontWeight: "bold",
    },
    favoriteButton: {
        padding: 5,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    emptyImage: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        fontWeight: "500",
    },

});

export default HistoryScreen;
