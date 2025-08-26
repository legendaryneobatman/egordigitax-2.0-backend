// search-pagination.service.ts
import { Injectable } from '@nestjs/common';
import { BasePaginationService } from './base-pagination.service';
import {PaginatedResult, PaginationParams} from "./types";

interface SearchPaginationParams extends PaginationParams {
    search?: string;
}

@Injectable()
export class SearchPaginationService extends BasePaginationService {
    /**
     * Paginate with search functionality
     */
    async paginateWithSearch<T>(
        repository: {
            findMany: (args: any) => Promise<T[]>;
            count: (args?: any) => Promise<number>;
        },
        params: SearchPaginationParams,
        searchFields: string[],
        where?: object,
    ): Promise<PaginatedResult<T>> {
        const { page, size, sort, search } = params;
        const pageSize = Math.min(size ?? this.DEFAULT_SIZE, this.MAX_PAGE_SIZE);
        const currentPage = page ?? this.DEFAULT_PAGE;
        const orderBy = sort?.field ? { [sort.field]: sort.order } : this.DEFAULT_SORT;

        let searchWhere = where || {};
        if (search) {
            const searchConditions = searchFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive' as const
                }
            }));

            searchWhere = {
                ...where,
                OR: searchConditions
            };
        }

        const [items, totalElements] = await Promise.all([
            repository.findMany({
                skip: currentPage * pageSize,
                take: pageSize,
                orderBy,
                where: searchWhere,
            }),
            repository.count(searchWhere),
        ]);

        const totalPages = Math.ceil(totalElements / pageSize);

        return {
            items,
            page: currentPage,
            totalElements,
            totalPages,
        };
    }
}
