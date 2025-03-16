export interface LoginField {
    email: string;
    password: string;
}

export interface RegisterField {
    image: any
    name : string
    email : string
    password : string
    role: string
    gender: string
}

export interface ChatbotField {
    prompt: string;
}

export interface addFavoriteField{
    token : any,
    perfumeId: any
}