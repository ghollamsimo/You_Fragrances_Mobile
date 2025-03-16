import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Api = () => {
    const instance = axios.create({
        baseURL: "http://192.168.1.116:8080/",
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        async (axiosConfig) => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    axiosConfig.headers.Authorization = `Bearer ${token}`;
                } else {
                    console.log("No token found in AsyncStorage");
                }
            } catch (error) {
                console.error("Error fetching token from AsyncStorage:", error);
            }
            return axiosConfig;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default Api;

