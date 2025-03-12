import axios from "axios";
import {config} from "../helpers/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Api = () => {
    const token = AsyncStorage.getItem("token");
    return axios.create(config(token));
}

export default Api