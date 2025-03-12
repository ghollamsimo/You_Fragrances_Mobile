import Api from "../api/Api";

class BrandService {
    private http: ReturnType<typeof Api>;

    constructor() {
        this.http = Api();
    }

    async index(){
        const response = await this.http.get('/brand/allBrands')
        return response.data
    }

    async show(id: string){
        const response = await this.http.get(`/brand/show/${id}`)
        return response.data
    }

}

export default new BrandService()