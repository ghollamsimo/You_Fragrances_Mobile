import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput, Switch, Alert, AppState
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/Store";
import {addReview, getReviewsByPerfume} from "../redux/slices/ReviewSlice";
import {setSelectedPerfume} from "../redux/slices/PerfumeSlice";

const StarRating = ({ rating, setRating }) => {
    return (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starButton}>
                    <Ionicons
                        name={rating >= star ? "star" : "star-outline"}
                        size={36}
                        color={rating >= star ? "#FFD700" : "#E5E5E5"}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const ToggleButton = ({ isEnabled = true, setIsEnabled = false, label }) => {
    return (
        <TouchableOpacity style={styles.toggleContainer} onPress={() => setIsEnabled(!isEnabled)} activeOpacity={0.8}>
            <Text style={styles.toggleLabel}>{label}</Text>
            <View style={[styles.toggleButton, isEnabled ? styles.toggleButtonActive : styles.toggleButtonInactive]}>
                <View style={[styles.toggleCircle, isEnabled ? styles.toggleCircleActive : styles.toggleCircleInactive]} />
            </View>
        </TouchableOpacity>
    )
}

const AddReviewModal = ({ modalVisible, setModalVisible, product }) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedPerfume = useSelector((state: RootState) => state.perfumes.selectedPerfume);
    const [rating, setRating] = useState(0);
    const [recommend, setRecommend] = useState(false);
    const [review, setReview] = useState('');

    const handleSubmit = async () => {
        try {
            const data = {
                rating,
                recommended: recommend,
                comment: review,
            };

            const response = await dispatch(addReview({ perfumeId: product._id, data }));

            if (response) {
                Alert.alert("Review submitted successfully");
            }

            setModalVisible(false);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit the review. Please try again.");
        }
    };

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
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Ionicons name="arrow-back" size={24} color="#000" />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Adding Review</Text>
                                <View style={{ width: 24 }} />
                            </View>

                            <View style={styles.productCard}>
                                {product?.image && typeof product.image === "string" && (
                                    <Image
                                        source={{ uri: product.image.replace('127.0.0.1', '192.168.1.116') }}
                                        style={styles.productImage}
                                        resizeMode="contain"
                                    />
                                )}


                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{typeof product.name === "string" ? product.name : JSON.stringify(product.name)}</Text>

                                    <Text style={styles.productBrand}>
                                        {product?.brand.name ? String(product.brand.name) : "No Brand Info"}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.ratingSection}>
                                <Text style={styles.ratingTitle}>How do you like it?</Text>
                                <StarRating rating={rating} setRating={setRating} />
                                <Text style={styles.ratingSubtitle}>Rate it from 1 to 5.</Text>
                            </View>

                            <ToggleButton
                                isEnabled={recommend}
                                setIsEnabled={setRecommend}
                                label="I recommend this product"
                            />

                            <View style={styles.reviewSection}>
                                <Text style={styles.reviewTitle}>Your Review</Text>
                                <TextInput
                                    style={styles.reviewInput}
                                    placeholder="What do you think about this product?"
                                    multiline
                                    value={review}
                                    onChangeText={setReview}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.submitButtonText}>Send</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default AddReviewModal;

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
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 10,
        maxHeight: '60%'
    },
    scrollViewContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
        borderColor: '#F0F0F0',
        borderWidth : 1,
        elevation: 2,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    productBrand: {
        fontSize: 14,
        color: '#9E9E9E',
    },
    ratingSection: {
        alignItems: 'center',
        marginVertical: 16,
    },
    ratingTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
    },
    starContainer: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    starButton: {
        padding: 4,
    },
    ratingSubtitle: {
        fontSize: 14,
        color: '#757575',
        marginTop: 8,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    toggleLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    toggleButton: {
        width: 50,
        height: 30,
        borderRadius: 15,
        padding: 2,
    },
    toggleButtonActive: {
        backgroundColor: '#3E7796',
    },
    toggleButtonInactive: {
        backgroundColor: '#E0E0E0',
    },
    toggleCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
    },
    toggleCircleActive: {
        alignSelf: 'flex-end',
    },
    toggleCircleInactive: {
        alignSelf: 'flex-start',
    },
    reviewSection: {
        marginVertical: 16,
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
    },
    reviewInput: {
        height: 150,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: '#000000',
        borderRadius: 12,
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#3E7796',
        borderRadius: 24,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
