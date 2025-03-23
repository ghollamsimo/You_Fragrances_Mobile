import React, {useState} from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import {BrandModal} from "../modals/BrandModal";

const AllBrandScreen = () => {
    const route = useRoute();
    const brands = route.params?.brands || [];
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState<null>(null)

    const openModal = (brand) => {
        setSelectedBrand(brand);
        setModalVisible(true);
    };



    const renderBrandCard = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => openModal(item)} style={styles.productCard}>
                <Image
                    source={{ uri: item.image?.replace('127.0.0.1', '192.168.1.116') }}
                    style={styles.productImage}
                />

                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.brandDescription} numberOfLines={2}>{item.description}</Text>
                </View>

                <View style={styles.rightSection}>
                    {item.country && (
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>{item.country}</Text>
                        </View>
                    )}
                </View>

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                title="All Brands"
                avatarUrl=""
                showProBadge={false}
            />
            {brands.length > 0 ? (
                <FlatList
                    data={brands}
                    renderItem={renderBrandCard}
                    keyExtractor={(item) => item._id}
                    numColumns={1}
                    key={`flatlist-numColumns-${1}`}
                    contentContainerStyle={styles.list}
                />

            ) : (
                <Text style={styles.emptyText}>No brands available</Text>
            )}
            {modalVisible &&
                <BrandModal modalVisible={modalVisible} closeModal={setModalVisible} selectedBrand={selectedBrand}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    list: {
        alignItems: "center",
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 5,
        width: '100%',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
        paddingHorizontal: 15,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    brandDescription: {
        fontSize: 12,
        color: '#777',
    },
    rightSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingBadge: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 3,
        paddingHorizontal: 8,
    },
    ratingText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default AllBrandScreen;
