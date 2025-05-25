export interface IAttribute {
  id: number;
  name: string;
  description: string;
  unit: string;
  type: IAttributeType;
}

export interface IAttributeValue {
  id: number;
  value: string;
  attributeId: number;

  colorHex: string;
  image: string;
  sortOrder: number;
}

export type IAttributeType =
  | 'COLOR'
  | 'SIZE'
  | 'MATERIAL'
  | 'DROPDOWN'
  | 'BOOLEAN'
  | 'NUMERIC';
