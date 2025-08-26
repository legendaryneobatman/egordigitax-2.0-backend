export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface PaginatedRequest {
  page?: number;
  size?: number;
  sort?: Sort;
}

export interface PaginatedResponse {
  page: number;
  totalElements: number;
  totalPages: number;
}

export interface SearchRequest<DTO extends object> extends PaginatedRequest {
  dto: DTO;
}

export interface SearchResponse<Item> extends PaginatedResponse {
  items: Item[];
}
