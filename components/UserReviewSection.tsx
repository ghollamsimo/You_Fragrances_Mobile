import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { getReviewsByPerfume } from "../redux/slices/ReviewSlice";


const UserReviewSection = ({ brandName, perfumeName, perfumeImage,perfumeId, averageRating }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const reviews = useSelector((state: RootState) => state.reviews.reviewData);

    const [fontsLoaded] = useFonts({
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

    useEffect(() => {
        if (perfumeId) {
            dispatch(getReviewsByPerfume(perfumeId));
        }
    }, [dispatch, perfumeId]); 

    if (!fontsLoaded) {
        return null; 
    }

    return (
        <View style={styles.container}>
            {averageRating && reviews.length > 0 ? (
             <TouchableOpacity
             onPress={() => {
               navigation.navigate('ReviewScreen', {
                 perfumeId,
                 perfumeName,
                 brandName,
                 perfumeImage
               });
             }}
             style={styles.reviewContainer}
           >
             <Text style={styles.title}>User Reviews</Text>
           
             <View style={styles.reviewRow}>
               <Text style={styles.ratingText}>{averageRating}</Text>
               <View style={styles.starContainer}>
                 {Array(5).fill(null).map((_, index) => (
                   <Ionicons key={index} name="star-outline" size={16} color="#F39C12" />
                 ))}
               </View>
               <Ionicons name="arrow-forward" size={18} color="gray" />
             </View>
           </TouchableOpacity>
           
            ) : (
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ReviewScreen', {
                      perfumeId,
                      perfumeName,
                      brandName,
                      perfumeImage
                    });
                  }}
                style={styles.reviewContainer}
                >
                    <Text style={styles.emptyReviewText}>Be the first to review this perfume</Text>
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
    title: {
        fontSize: 18,
        fontWeight: "300",
        fontFamily: 'Poppins-SemiBold',
    },
    reviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    emptyReviewText: {
        fontSize: 16,
        color: '#F39C12',
    },
});
