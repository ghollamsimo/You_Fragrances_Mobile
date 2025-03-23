import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../components/Header";

const AllPerfumeScreen = () => {
    const route = useRoute();
    const perfumes = route.params?.perfumes || [];
    const navigation = useNavigation();

    const renderPerfumeCard = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.productCard}
                onPress={() => navigation.navigate('PerfumeDetails', { perfume: item })}
            >
                <Image source={{ uri: item.image.replace('127.0.0.1', '192.168.1.116') }} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={styles.ratingBadge}>Rating: {item.averageRating}</Text>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardSubtitle}>{item.brand.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header title="All Perfumes" avatarUrl="" showProBadge={false} />
            {perfumes.length > 0 ? (
                <FlatList
                    data={perfumes}
                    renderItem={renderPerfumeCard}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.emptyText}>No perfumes available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#FFF",
    },
    list: {
        paddingBottom: 20,
        marginTop: 20,
    },
    row: {
        justifyContent: "space-between", // Ajoute un espacement entre les colonnes
        marginBottom: 10, // Ajoute un espacement vertical entre les lignes
    },
    productCard: {
        width: "48%",
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 5, // Ajoute un léger espacement horizontal
        elevation: 2,
        overflow: 'hidden',
        borderColor: '#E8E9EB',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: 170,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
    },
    ratingBadge: {
        backgroundColor: '#3E7796',
        color: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        fontSize: 12,
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default AllPerfumeScreen;
