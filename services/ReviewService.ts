import Api from "../api/Api";

class ReviewService {
    private http: ReturnType<typeof Api>;

    private constructor(http: ReturnType<typeof Api>) {
        this.http = http;
    }

    static async create() {
        const http = await Api();
        return new ReviewService(http);
    }

    async addReview(perfumeId: string, data: any) {
        const response = await this.http.post(`/reviews/store/${perfumeId}`, data);
        return response.data;
    }

    async getUserReviews() {
        const response = await this.http.get(`/reviews/user`, {});
        return response.data;
    }

    async getReviewsByPerfume(perfumeId: string) {
        const response = await this.http.get(`/reviews/perfume/${perfumeId}`);
        return response.data;
    }

    async removeFavorite(perfume: string) {
        const response = await this.http.delete(`/favorites/${perfume}`);
        return response.data;
    }
}
export default ReviewService.create();