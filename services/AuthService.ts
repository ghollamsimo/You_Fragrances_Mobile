import Api from "../api/Api";
import {LoginField, RegisterField} from "../constant";

class AuthService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }


    async register(data: RegisterField){
        const response = await this.http.post(`/users/store`, data)
        return response.data
    }

    async login(data: LoginField){
        const response = await this.http.post(`/users/login`, data)
        return response.data
    }
}

export default new AuthService()