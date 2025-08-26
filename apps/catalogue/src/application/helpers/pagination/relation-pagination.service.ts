// relation-pagination.service.ts
import { Injectable } from '@nestjs/common';
import { BasePaginationService } from './base-pagination.service';
import {PaginatedResult, PaginationParams} from "./types";

@Injectable()
export class RelationPaginationService extends BasePaginationService {
    /**
     * Paginate with eager loading relations
     */
    async paginateWithRelations<T>(
        repository: {
            findMany: (args: any) => Promise<T[]>;
            count: (args?: any) => Promise<number>;
        },
        params: PaginationParams & { include?: object },
        where?: object,
    ): Promise<PaginatedResult<T>> {
        const page = params.page ?? this.DEFAULT_PAGE;
        const size = Math.min(params.size ?? this.DEFAULT_SIZE, this.MAX_PAGE_SIZE);
        const sort = params.sort ?? this.DEFAULT_SORT;
        const include = params.include;

        const orderBy = sort.field ? { [sort.field]: sort.order } : undefined;

        const [items, totalElements] = await Promise.all([
            repository.findMany({
                skip: page * size,
                take: size,
                orderBy,
                where,
                include, // Include related entities
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
}
