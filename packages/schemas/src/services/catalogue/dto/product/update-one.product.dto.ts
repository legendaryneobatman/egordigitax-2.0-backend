export interface UpdateOneProductRequest {
    id:number,
    name: string;
    description: string;
    image: string;
    price: number;
    oldPrice: number;
    discount: number;
}

export interface UpdateOneProductResponse {
    name: string;
    description: string;
    image: string;
    price: number;
    oldPrice: number;
    discount: number;
}
