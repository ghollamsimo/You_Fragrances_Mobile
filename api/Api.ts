import axios from "axios";
import { config } from "../helpers/Config";
const Api = () => {
    const http = axios.create(config());
    return {
        http
    }
}

export default Api