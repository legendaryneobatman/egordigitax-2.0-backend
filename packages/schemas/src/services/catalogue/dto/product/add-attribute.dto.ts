import { IProduct } from '../../resources/IProduct';

export interface AddAttributeRequest {
  id: IProduct['id'];
  attributeId: number;
  valueId: number;
}

export interface AddAttributeResponse {
  success: boolean;
  message?: string;
  attribute?: {
    id: number;
    name: string;
    value: string;
  };
}
