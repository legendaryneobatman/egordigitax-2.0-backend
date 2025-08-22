// pagination.service.ts
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class PaginationService {
    private readonly DEFAULT_PAGE = 0;
    private readonly DEFAULT_SIZE = 10;
    private readonly DEFAULT_SORT = { field: 'id', order: 'asc' as const };

    async paginate<T>(
        repository: {
            findMany: (args: any) => Promise<T[]>;
            count: (args?: any) => Promise<number>;
        },
        params: PaginationParams,
        where?: object,
    ): Promise<PaginatedResult<T>> {
        const page = params.page ?? this.DEFAULT_PAGE;
        const size = params.size ?? this.DEFAULT_SIZE;
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
}
