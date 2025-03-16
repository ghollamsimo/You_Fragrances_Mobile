import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserReviewSection = ({ averageRating, reviews }) => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
                {averageRating && reviews.length > 0 ? (
            <TouchableOpacity
                onPress={() => navigation.navigate('ReviewScreen')}
                style={styles.reviewContainer}
            >
                <Text style={{ fontSize: 18, fontWeight: "300", fontFamily: 'Poppins-SemiBold' }}>
                    User Reviews
                </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{averageRating}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Ionicons name="star-outline" size={16} color="#F39C12" />
                            <Ionicons name="star-outline" size={16} color="#F39C12" />
                            <Ionicons name="star-outline" size={16} color="#F39C12" />
                            <Ionicons name="star-outline" size={16} color="#F39C12" />
                            <Ionicons name="star-outline" size={16} color="#F39C12" />
                        </View>

                        <View>
                            <Ionicons name="arrow-forward" size={18} color="gray" />
                        </View>
                    </View>
            </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')} style={styles.reviewContainer}>
                        <Text style={{ fontSize: 16, color: '#F39C12' }}>
                            Be the first to review this perfume
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="gray" />
                    </TouchableOpacity>
                )}
        </View>
    );
};

export default UserReviewSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    reviewContainer: {
        paddingVertical: 20,
        borderRadius: 20,
        paddingHorizontal: 15,
        width: '100%',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#3E7796',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFF',
        alignItems: 'center',
    },
});
