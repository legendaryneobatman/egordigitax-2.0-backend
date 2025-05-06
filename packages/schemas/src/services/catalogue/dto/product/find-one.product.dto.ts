import { IProduct } from '../../resources/IProduct';

export interface FindOneProductRequest {
  id: number;
}

export interface FindOneProductResponse {
  item: IProduct;
}
