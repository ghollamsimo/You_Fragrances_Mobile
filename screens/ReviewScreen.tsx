import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, Star } from 'lucide-react-native';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/Store";
import AddReviewModal from "../modals/AddReviewModal";
import {useNavigation} from "@react-navigation/native";

const ReviewScreen = () => {
    const selectedPerfume = useSelector((state: RootState) => state.perfumes.selectedPerfume);
    const navigation = useNavigation()
    const [writeModal , setWriteModal] = useState<boolean>()
    if (!selectedPerfume) {
        return <Text>No perfume selected</Text>;
    }

    const renderStars = (rating) => {
        return (
            <View style={styles.starsContainer}>
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} color={i < rating ? "#FFD700" : "#D3D3D3"} />
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
>
    <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Reviews</Text>
    </View>

            <ScrollView style={styles.reviewsContainer}>
                {selectedPerfume?.reviews?.length > 0 ? (
                    selectedPerfume.reviews.map((review: any, index) => {
                        return (
                            <View key={index} style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <View style={styles.userInfo}>
                                        <Image source={{uri : review.user.image?.replace('127.0.0.1', '192.168.1.116')}}/>
                                        <Text style={styles.userName}>{review.user.name}</Text>
                                        <Text style={styles.date}>{new Date(review.createdAt).toDateString()}</Text>
                                    </View>
                                    {renderStars(review.rating)}
                                </View>

                                <Text style={styles.reviewText}>{review.comment}</Text>

                                {review.recommended && (
                                    <View style={styles.recommendedContainer}>
                                        <Text style={styles.recommendedText}>🌟 Recommended!</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })
                ) : (
                    <Text style={{ textAlign: "center", padding: 20 }}>No reviews available.</Text>
                )}
            </ScrollView>

    <TouchableOpacity onPress={() => setWriteModal(true)} style={styles.writeReviewButton}>
    <Text style={styles.writeReviewText}> Write Review</Text>
    </TouchableOpacity>
            {writeModal && <AddReviewModal product={selectedPerfume} modalVisible={writeModal} setModalVisible={setWriteModal}/>}
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        borderColor: '#F5F5F5',
        borderWidth: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
    },
    reviewsContainer: {
        flex: 1,
        padding: 16,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    additionalInfo: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        color: '#000',
        fontWeight: '500',
    },
    bulletPoint: {
        marginHorizontal: 6,
        color: '#666',
    },
    reviewText: {
        fontSize: 15,
        lineHeight: 22,
        marginTop: 8,
    },
    recommendedContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recommendedText: {
        color: '#3E7796',
        fontSize: 14,
        fontWeight: '500',
    },
    writeReviewButton: {
        backgroundColor: '#3E7796',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    writeReviewText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ReviewScreen;