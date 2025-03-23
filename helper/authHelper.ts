import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { logout } from "../redux/slices/AuthSlice";
import { store } from "../redux/Store";

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;

export const saveLoginTime = async () => {
    const currentTime = Date.now().toString();
    await AsyncStorage.setItem("loginTime", currentTime);
};

export const checkTokenExpiration = async () => {
    try {
        const savedTime = await AsyncStorage.getItem("loginTime");
        if (!savedTime) {
            console.log("No login time found");
            return;
        }

        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(savedTime, 10);
        console.log("Time elapsed:", timeElapsed);

        if (timeElapsed > TOKEN_EXPIRATION_TIME) {
            console.log("Session expired, showing alert");
            Alert.alert("Session Expirée", "Vous devez vous reconnecter.", [
                { text: "OK", onPress: () => store.dispatch(logout()) },
            ]);
            stopTokenChecker();
        } else {
            console.log("Session still valid");
        }
    } catch (error) {
        console.error("Erreur dans checkTokenExpiration :", error);
    }
};

let tokenInterval: NodeJS.Timeout | null = null;

export const startTokenChecker = () => {
    if (!tokenInterval) {
        tokenInterval = setInterval(checkTokenExpiration, 30 * 1000);
    }
};

export const stopTokenChecker = () => {
    if (tokenInterval) {
        clearInterval(tokenInterval);
        tokenInterval = null;
    }
};
