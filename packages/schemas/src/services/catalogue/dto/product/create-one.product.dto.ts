export interface CreateOneProductRequest {
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
}

export interface CreateOneProductResponse {
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
}
