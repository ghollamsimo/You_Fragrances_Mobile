import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { addFavorite, getUserFavorites } from "../redux/slices/FavoriteSlice";
import { jwtDecode } from "jwt-decode";

const PerfumeNavbar: React.FC<{ perfumeId: string }> = ({ perfumeId }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    });

    const favorites = useSelector((state: RootState) => state.favorites.favoritesData || []);
    const isFavorite = favorites.includes(perfumeId);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    const decoded: any = jwtDecode(storedToken);
                    setUserId(decoded.id);
                    dispatch(getUserFavorites()).unwrap()
                        .then(() => console.log("Favorites loaded"))
                        .catch(err => console.error("Error fetching favorites", err));
                }
            } catch (error) {
                console.error("Error fetching or decoding token:", error);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, [dispatch]);

    const handleSubmit = () => {
        if (!token) {
            Alert.alert("Access Denied", "You need to be logged in to use this feature.", [{ text: "OK" }]);
            return;
        }

        if (isFavorite) {
            Alert.alert("Already Favorited", "This perfume is already in your favorites.", [{ text: "OK" }]);
            return;
        }

        dispatch(addFavorite(perfumeId))
            .unwrap()
            .then(() => {
                dispatch(getUserFavorites());
            })
            .catch((error) => {
                console.error("Failed to add favorite:", error);
            });
    };

    if (!fontsLoaded || loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.iconWrapper}
            >
                <Ionicons name="arrow-back" size={24} color="gray" />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={[styles.title, { fontFamily: "Poppins-SemiBold" }]}>
                    Perfume Details
                </Text>
            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.iconHeart}
                disabled={!userId}
            >
                <Ionicons
                    name="heart"
                    color={token ? (isFavorite ? "red" : "gray") : "gray"}
                    size={24}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomColor: "#d9dadb",
        borderWidth: 0.5,
    },
    iconWrapper: {
        borderWidth: 1,
        padding: 8,
        borderColor: "#d9dadb",
        borderRadius: 50,
    },
    iconHeart: {
        padding: 8,
        borderColor: "#d9dadb",
        borderRadius: 50,
        borderWidth: 1,
    },
    textContainer: {
        borderColor: "#ccc",
        borderRadius: 25,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "100",
    },
});

export default PerfumeNavbar;
