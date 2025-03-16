import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scanner from "../components/ScannerComponent";

const { width, height } = Dimensions.get("window");

const ScanModal = ({ modalVisible, setModalVisible }) => {
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [results, setResults] = useState(false)
    const handleScan = (barcode: string) => {
        console.log("Scanned Data:", barcode);
        setScannedData(barcode);
        setResults(true)
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
                    <Scanner onScan={handleScan} onClose={() => setModalVisible(false)} style={styles.scanner} />



                    <View style={styles.maskContainer}>
                        <View style={styles.maskTop} />
                        <View style={styles.maskRow}>
                            <View style={styles.maskSide} />
                            <View style={styles.scanFrame} />
                            <View style={styles.maskSide} />
                        </View>
                        <View style={styles.maskBottom} />
                    </View>

                    {/* Contenu de la modale */}
                    <View style={styles.modalContent}>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.roundButton}>
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.roundButton}>
                                <Ionicons name="sunny" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.scanText}>Scan the barcode</Text>

                        {scannedData && <Text style={styles.scannedText}>Scanned: {scannedData}</Text>}
                    </View>
                </View>
            </Modal>
            {results && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Scanned Barcode: {scannedData}</Text>
                    <TouchableOpacity
                        onPress={() => setResults(false)} // Ferme le résultat
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}        </SafeAreaView>
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
});
