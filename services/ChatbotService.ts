import Api from "../api/Api";
import {ChatbotField} from "../constant";

class ChatbotService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }


    async sendMessage(data: ChatbotField){
        const response = await this.http.post(`/chatbot/message`, data , {headers: {'Content-Type': 'application/json'}})
        return response.data
    }

    async history(){
        const response = await this.http.get(`/chatbot/history`)
        return response.data
    }
}

export default new ChatbotService()