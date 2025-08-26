// cursor-pagination.service.ts
import { Injectable } from '@nestjs/common';
import { BasePaginationService } from './base-pagination.service';
import {CursorPaginatedResult, CursorPaginationParams, PaginationParams} from "./types";

@Injectable()
export class CursorPaginationService extends BasePaginationService {
    /**
     * Paginate with cursor-based pagination for better performance on large datasets
     */
    async paginateWithCursor<T extends {id: string}>(
        repository: {
            findMany: (args: any) => Promise<T[]>;
        },
        params: CursorPaginationParams,
        where?: object,
    ): Promise<CursorPaginatedResult<T>> {
        const { cursor, size, sort } = params;
        const pageSize = Math.min(size ?? this.DEFAULT_SIZE, this.MAX_PAGE_SIZE);
        const orderBy = sort?.field ? { [sort.field]: sort.order } : this.DEFAULT_SORT;

        const items = await repository.findMany({
            cursor: cursor ? { id: cursor } : undefined,
            skip: cursor ? 1 : 0, // Skip the cursor item if provided
            take: pageSize,
            orderBy,
            where,
        });

        // Determine if there are more items
        const hasNextPage = items.length > pageSize;
        if (hasNextPage) {
            items.pop(); // Remove the extra item
        }

        return {
            items,
            hasNextPage,
            endCursor: items.length > 0 ? items[items.length - 1].id : null,
        };
    }
}
