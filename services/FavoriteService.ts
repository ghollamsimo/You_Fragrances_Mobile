import Api from "../api/Api";

class FavoriteService {
    private http: ReturnType<typeof Api>;

    private constructor(http: ReturnType<typeof Api>) {
        this.http = http;
    }

    static async create() {
        const http = await Api();
        return new FavoriteService(http);
    }

    async addFavorite(perfumeId: string) {
        const response = await this.http.post(`/favorites/${perfumeId}`, {});
        return response.data;
    }

    async getUserFavorites() {
        const response = await this.http.get(`/favorites`);
        console.log("gggg", response.data);
        
        return response.data;
    }

    async removeFavorite(perfume: string) {
        const response = await this.http.delete(`/favorites/${perfume}`);
        return response.data;
    }
}
export default FavoriteService.create();