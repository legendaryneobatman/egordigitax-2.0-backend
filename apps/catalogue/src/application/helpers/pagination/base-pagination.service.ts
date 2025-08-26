import { Injectable } from '@nestjs/common';
import {PaginatedResult, PaginationParams} from "./types";

@Injectable()
export class BasePaginationService {
    protected readonly DEFAULT_PAGE = 0;
    protected readonly DEFAULT_SIZE = 10;
    protected readonly DEFAULT_SORT = { field: 'id', order: 'asc' as const };
    protected MAX_PAGE_SIZE: number = 100;

    async paginate<T>(
        repository: {
            findMany: (args: any) => Promise<T[]>;
            count: (args?: any) => Promise<number>;
        },
        params: PaginationParams,
        where?: object,
    ): Promise<PaginatedResult<T>> {
        const page = params.page ?? this.DEFAULT_PAGE;
        const size = Math.min(params.size ?? this.DEFAULT_SIZE, this.MAX_PAGE_SIZE);
        const sort = params.sort ?? this.DEFAULT_SORT;

        const orderBy = sort.field ? { [sort.field]: sort.order } : undefined;

        const [items, totalElements] = await Promise.all([
            repository.findMany({
                skip: page * size,
                take: size,
                orderBy,
                where,
            }),
            repository.count(where),
        ]);

        const totalPages = Math.ceil(totalElements / size);

        return {
            items,
            page,
            totalElements,
            totalPages,
        };
    }

    /**
     * Validate pagination parameters
     */
    validatePaginationParams(params: PaginationParams): void {
        if (params.page !== undefined && params.page < 0) {
            throw new Error('Page must be a non-negative integer');
        }

        if (params.size !== undefined && (params.size <= 0 || params.size > this.MAX_PAGE_SIZE)) {
            throw new Error(`Size must be between 1 and ${this.MAX_PAGE_SIZE}`);
        }

        if (params.sort && params.sort.field && typeof params.sort.field !== 'string') {
            throw new Error('Sort field must be a string');
        }

        if (params.sort && params.sort.order && !['asc', 'desc'].includes(params.sort.order)) {
            throw new Error('Sort order must be either "asc" or "desc"');
        }
    }
}
