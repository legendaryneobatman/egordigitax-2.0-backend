import { IProduct } from '../../resources/IProduct';

export interface FindManyProductRequest {}

export interface FindManyProductResponse {
  items: IProduct[];
}
