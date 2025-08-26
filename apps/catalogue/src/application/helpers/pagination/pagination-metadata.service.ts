// pagination-metadata.service.ts
import {Injectable} from '@nestjs/common';
import {
    PaginatedResult, PaginationParams, PaginationMetadata,
    PaginationLinks
} from "./types";

@Injectable()
export class PaginationMetadataService {
    private readonly DEFAULT_SIZE = 10;

    /**
     * Generate pagination metadata for API responses
     */
    generatePaginationMetadata<T>(
        result: PaginatedResult<T>,
        baseUrl: string,
        params: PaginationParams
    ): PaginationMetadata {
        const {page, totalPages, totalElements} = result;
        const {size = this.DEFAULT_SIZE} = params;

        const hasNextPage = page < totalPages - 1;
        const hasPreviousPage = page > 0;

        const links: PaginationLinks = {
            first: `${baseUrl}?page=0&size=${size}`,
            last: `${baseUrl}?page=${totalPages - 1}&size=${size}`,
        };

        if (hasNextPage) {
            links.next = `${baseUrl}?page=${page + 1}&size=${size}`;
        }

        if (hasPreviousPage) {
            links.prev = `${baseUrl}?page=${page - 1}&size=${size}`;
        }

        return {
            currentPage: page,
            totalPages,
            totalElements,
            pageSize: size,
            links
        };
    }
}
