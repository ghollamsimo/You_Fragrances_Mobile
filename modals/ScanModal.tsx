import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scanner from "../components/ScannerComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/Store";
import {indexPerfumes} from "../redux/slices/PerfumeSlice";
import {useNavigation} from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ScanModal = ({ modalVisible, setModalVisible }) => {
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [showNoMatch, setShowNoMatch] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const perfumes = useSelector((state: RootState) => state.perfumes.perfumesData);



    const filterBarcode = (barcode: string) => {
        const matchingPerfume = perfumes.find((perfume) =>
            perfume?.Barcode === barcode
        );
        return matchingPerfume || null;
    };

    const handleScan = (barcode: string) => {
        setScannedData(barcode);
        const matchedPerfume = filterBarcode(barcode);

        if (matchedPerfume) {
            navigation.navigate('PerfumeDetails', { perfume: matchedPerfume });
            handleClose();
        } else {
            setShowNoMatch(true);
        }
    };

    const handleClose = () => {
        setScannedData(null);
        setShowNoMatch(false);
        setModalVisible(false);
    };

    useEffect(() => {
        dispatch(indexPerfumes());
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleClose}
            >
                <View style={styles.modalContainer}>
                    {/* Scanner View */}
                    {!showNoMatch && (
                        <>
                            <Scanner
                                onScan={handleScan}
                                onClose={handleClose}
                                style={styles.scanner}
                            />
                            <View style={styles.maskContainer}>
                                <View style={styles.maskTop} />
                                <View style={styles.maskRow}>
                                    <View style={styles.maskSide} />
                                    <View style={styles.scanFrame} />
                                    <View style={styles.maskSide} />
                                </View>
                                <View style={styles.maskBottom} />
                            </View>

                            <View style={styles.modalContent}>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        onPress={handleClose}
                                        style={styles.roundButton}
                                    >
                                        <Ionicons name="close" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.roundButton}>
                                        <Ionicons name="sunny" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.scanText}>Scan the barcode</Text>
                            </View>
                        </>
                    )}

                    {showNoMatch && scannedData && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>
                                No matching product found for barcode: {scannedData}
                            </Text>
                            <TouchableOpacity
                                onPress={handleClose}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default ScanModal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: "center",
        alignItems: "center",
    },
    scanner: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    maskContainer: {
        position: "absolute",
        width: width,
        height: height,
        alignItems: "center",
    },
    maskTop: {
        width: "100%",
        height: height * 0.4,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    maskRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    maskSide: {
        width: width * 0.15,
        height: width * 0.4,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    scanFrame: {
        width: width * 0.7,
        height: width * 0.4,
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 16,
        backgroundColor: "transparent", // ✅ Zone normale de la caméra
    },
    maskBottom: {
        width: "100%",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalContent: {
        position: "absolute",
        top: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 16,
        width: "100%",
    },
    roundButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    scanText: {
        marginTop: 10,
        color: "white",
        fontSize: 18,
        fontWeight: "500",
    },
    scannedText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    resultContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    closeButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#FF5733',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
