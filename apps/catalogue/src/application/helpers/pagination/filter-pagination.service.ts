// filter-pagination.service.ts
import { Injectable } from '@nestjs/common';
import { BasePaginationService } from './base-pagination.service';
import {PaginatedResult, PaginationParams} from "./types";

interface FilterPaginationParams extends PaginationParams {
    filters?: Record<string, any>;
}

@Injectable()
export class FilterPaginationService extends BasePaginationService {
    /**
     * Paginate with filtering capabilities
     */
    async paginateWithFilters<T>(
        repository: {
            findMany: (args: any) => Promise<T[]>;
            count: (args?: any) => Promise<number>;
        },
        params: FilterPaginationParams,
        where?: object,
    ): Promise<PaginatedResult<T>> {
        const { page, size, sort, filters } = params;
        const pageSize = Math.min(size ?? this.DEFAULT_SIZE, this.MAX_PAGE_SIZE);
        const currentPage = page ?? this.DEFAULT_PAGE;
        const orderBy = sort?.field ? { [sort.field]: sort.order } : this.DEFAULT_SORT;

        // Apply filters to where condition
        let filterWhere = { ...where };
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    filterWhere[key] = value;
                }
            });
        }

        const [items, totalElements] = await Promise.all([
            repository.findMany({
                skip: currentPage * pageSize,
                take: pageSize,
                orderBy,
                where: filterWhere,
            }),
            repository.count(filterWhere),
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
