import { CameraView } from 'expo-camera';
import { Button, StyleSheet, Text, View } from 'react-native';
import useScanner from "../hooks/useScanner";



export default function Scanner({ onScan, onClose }) {
    const {
        facing,
        permission,
        scanned,
        setScanned,
        requestPermission,
        handleBarCodeScanned,
    } = useScanner();

    const handleScan = ({ type, data }: { type: string; data: string }) => {
        const barcode = handleBarCodeScanned({ type, data });
        onScan(barcode);
        setScanned(true);
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleScan}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
    },
    message: {
        textAlign: 'center',
        color: 'white',
        padding: 20,
    },
    camera: {
        flex: 1,
    },
});
