import type React from "react"
import {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    SafeAreaView,
} from "react-native"
import {X} from "lucide-react-native"
import {BrandModal} from "../modals/BrandModal";

const PopularBrands = ({brands}: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState<null>(null)
    const openModal = (brand) => {
        setSelectedBrand(brand)
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
        setSelectedBrand(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.popular_section}>
                <Text style={styles.title}>Popular Brands</Text>

                <TouchableOpacity style={styles.proBadge}>
                    <Text style={styles.proBadge_text}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {brands.map((brand) => (
                    <TouchableOpacity
                        key={brand._id}
                        style={styles.productCard}
                        onPress={() => openModal(brand)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: brand.image.replace('127.0.0.1', '192.168.1.116') }}
                                style={styles.images}
                            />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{brand.name}</Text>
                            <Text style={styles.cardSubtitle} numberOfLines={2}>
                                {brand.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {modalVisible &&
                <BrandModal modalVisible={modalVisible} closeModal={setModalVisible} selectedBrand={selectedBrand}/>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // marginVertical: 20,
    },
    popular_section: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    productCard: {
        width: 300,
        borderRadius: 10,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        elevation: 2,
        overflow: "hidden",
        borderColor: "#E8E9EB",
        borderWidth: 1,
        height: 250,
    },
    imageContainer: {
        flex: 1,
    },
    images: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        padding: 10,
        resizeMode: "cover",
        borderBottomColor: "#E8E9EB",
        borderBottomWidth: 1,
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    cardSubtitle: {
        fontSize: 12,
        color: "#666",
    },
    proBadge_text: {
        color: "#FFFFFF",
    },
    proBadge: {
        backgroundColor: "#3E7796",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },


})

export default PopularBrands

