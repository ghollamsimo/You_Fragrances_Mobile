import Api from "../api/Api";

class PerfumeService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }

    async index(){
        const response = await this.http.get('/perfumes/allPerfumes')
        return response.data
    }

    async perfumeDetail(id: string){
        const response = await this.http.get(`/brand/show/${id}`)
        return response.data
    }

    async favorite(perfumeId: string){
        const response = await this.http.get(`/favorites/${perfumeId}`)
        return response.data
    }
}

export default new PerfumeService()