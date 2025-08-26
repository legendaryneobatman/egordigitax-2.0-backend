import {Sort} from "@repo/schemas";

export interface PaginationParams {
    page?: number;
    size?: number;
    sort?: Sort;
}

export interface PaginatedResult<T> {
    items: T[];
    page: number;
    totalElements: number;
    totalPages: number;
}

export interface CursorPaginationParams extends Omit<PaginationParams, 'page'> {
    cursor?: string;
}

export interface CursorPaginatedResult<T> {
    items: T[];
    hasNextPage: boolean;
    endCursor: string | null;
}


export interface CursorPaginationParams extends Omit<PaginationParams, 'page'> {
    cursor?: string;
}

export interface SearchPaginationParams extends PaginationParams {
    search?: string;
}

export interface FilterPaginationParams extends PaginationParams {
    filters?: Record<string, any>;
}

export interface PaginationMetadata {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    links: PaginationLinks;
}

export interface PaginationLinks {
    first: string;
    last: string;
    next?: string;
    prev?: string;
}


export interface PaginationMetadata {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    links: PaginationLinks;
}

export interface PaginationLinks {
    first: string;
    last: string;
    next?: string;
    prev?: string;
}
