import {IProductMetaTag, IProductStatus} from "../../resources/IProduct";

export interface CreateOneProductRequest {
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  SKU: string;
  weight: number;
  status: IProductStatus;
  categoryId: number;
}

export interface CreateOneProductResponse {
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  SKU: string;
  weight: number;
  status: IProductStatus;
  categoryId: number;
}
