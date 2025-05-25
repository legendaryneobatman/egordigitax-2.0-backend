export interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  SKU: string;
  weight: number;
  status: IProductStatus;
}

export interface IProductMetaTag {
  productId: number;
  title: string;
  description: string;
  keywords: string[];
  tags: Record<string, string | number>;
}

export type IProductStatus = 'ACTIVE' | 'DISABLED' | 'ARCHIVED';
