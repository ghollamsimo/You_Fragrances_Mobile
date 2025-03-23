import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView, Image, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppDispatch, RootState} from "../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import {fetchFollowedBrands} from "../redux/slices/AuthSlice";


const MyFollowingModal = ({ modalVisible, setModalVisible }) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch<AppDispatch>()
    const followingBrand = useSelector((state: RootState) => state.auth.followBrandData)

    useEffect(() => {
        dispatch(fetchFollowedBrands())
    }, [dispatch]);


    const renderBrandCard = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.productCard}>
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
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <Text style={styles.modalTitle}>My Following</Text>
    <TouchableOpacity
    style={styles.closeButton}
    onPress={() => setModalVisible(false)}
>
    <Ionicons style={styles.buttonText} name='close' size={16} />
    </TouchableOpacity>
    </View>
    { followingBrand && followingBrand.length === 0 ? (
        <View  style={{}}>
        <Text>No Following Brand yet</Text>
        </View>
    ): (
        <>
            <FlatList
                data={followingBrand?.followedBrands}
                renderItem={renderBrandCard}
                keyExtractor={(item) => item._id}
                numColumns={1}
                key={`flatlist-numColumns-${1}`}
                contentContainerStyle={styles.list}
            />
    ))}
        </>
    )}

    </ScrollView>
    </View>
    </View>
    </Modal>
    </SafeAreaView>
);
};

export default MyFollowingModal;

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
        maxHeight: '55%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        paddingVertical: 8,
    },
    closeButton: {
        borderWidth: 1,
        borderColor: '#d9dadb',
        padding: 7,
        borderRadius: 50,
        alignSelf: 'flex-start',
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
