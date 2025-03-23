import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions
} from "react-native";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { followBrand } from "../redux/slices/AuthSlice";

export const BrandModal = ({ modalVisible, closeModal, selectedBrand }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    const followingBrands = useSelector((state: RootState) => state.auth.followBrandData);

    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    useEffect(() => {
        if (modalVisible && selectedBrand?._id) {
            if (Array.isArray(followingBrands)) {
                setIsFollowing(followingBrands.includes(selectedBrand._id));
            } else {
                setIsFollowing(false);
            }
        }
    }, [modalVisible, selectedBrand, followingBrands]);

    const toggleFollow = async () => {
        if (!selectedBrand?._id || isProcessing) {
            return;
        }

        setIsProcessing(true);
        try {
            await dispatch(followBrand(selectedBrand._id)).unwrap();
            setIsFollowing((prev) => !prev);
        } catch (error) {
            console.error("Error following brand:", error);
        }
        setIsProcessing(false);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => closeModal(false)}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedBrand?.name ?? "Brand"}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {selectedBrand?._id && (
                                isFollowing ? (
                                    <View style={[styles.followButton, styles.followingButton]}>
                                        <Text style={styles.followingButtonText}>Following</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.followButton}
                                        onPress={toggleFollow}
                                        disabled={isProcessing}
                                    >
                                        <Text style={styles.followButtonText}>Follow</Text>
                                    </TouchableOpacity>
                                )
                            )}

                            <TouchableOpacity onPress={() => closeModal(false)} style={styles.closeButton}>
                                <X size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={styles.modalBody}>
                        {selectedBrand?.image && (
                            <Image source={{ uri: selectedBrand.image.replace('127.0.0.1', '192.168.1.116') }} style={styles.modalImage} />
                        )}
                        <Text style={styles.modalDescription}>{selectedBrand?.description ?? "No description available"}</Text>

                        <View style={styles.brandInfoSection}>
                            <Text style={styles.sectionTitle}>Popular Perfumes</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {selectedBrand?.perfumes?.length > 0 ? (
                                    selectedBrand.perfumes.map((perfume) => (
                                        <TouchableOpacity
                                            key={perfume._id}
                                            style={styles.productCard}
                                            onPress={() => navigation.navigate('PerfumeDetails', { perfume: perfume })}
                                        >
                                            <Image source={{ uri: perfume.image.replace('127.0.0.1', '192.168.1.116') }} style={styles.image} />
                                            <View style={styles.cardContent}>
                                                <Text style={styles.cardTitle}>{perfume?.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>No Perfumes Found</Text>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>    );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.8,
        width: "100%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E9EB",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        padding: 5,
    },
    modalBody: {
        padding: 15,
    },
    modalImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: "contain",
    },
    modalDescription: {
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
        marginBottom: 20,
    },
    brandInfoSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    productCard: {
        width: 160,
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        elevation: 2,
        overflow: 'hidden',
        borderColor: '#E8E9EB',
        borderWidth: 1,
    },
    image: {
        padding: 10,
        borderRadius: 15,
        width: '100%',
        height: 170,
        resizeMode: 'cover',

    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    followButton: {
        backgroundColor: "#3E7796",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    followingButton: {
        backgroundColor: "#E8E9EB",
    },
    followButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
    followingButtonText: {
        color: "#333",
    },
});
