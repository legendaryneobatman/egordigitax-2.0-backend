import { Injectable } from '@nestjs/common';
import { BasePaginationService } from './base-pagination.service';
import { CursorPaginationService } from './cursor-pagination.service';
import { SearchPaginationService } from './search-pagination.service';
import { FilterPaginationService } from './filter-pagination.service';
import { RelationPaginationService } from './relation-pagination.service';
import { PaginationMetadataService } from './pagination-metadata.service';

@Injectable()
export class PaginationService {
    constructor(
        private readonly basePaginationService: BasePaginationService,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly searchPaginationService: SearchPaginationService,
        private readonly filterPaginationService: FilterPaginationService,
        private readonly relationPaginationService: RelationPaginationService,
        private readonly paginationMetadataService: PaginationMetadataService
    ) { }

    async paginate<T>(...args: Parameters<typeof this.basePaginationService.paginate<T>>) {
        return this.basePaginationService.paginate<T>(...args);
    }

    async paginateWithCursor(...args: Parameters<typeof this.cursorPaginationService.paginateWithCursor>) {
        return this.cursorPaginationService.paginateWithCursor(...args);
    }

    async paginateWithSearch(...args: Parameters<typeof this.searchPaginationService.paginateWithSearch>) {
        return this.searchPaginationService.paginateWithSearch(...args);
    }

    async paginateWithFilters(...args: Parameters<typeof this.filterPaginationService.paginateWithFilters>) {
        return this.filterPaginationService.paginateWithFilters(...args);
    }

    async paginateWithRelations(...args: Parameters<typeof this.relationPaginationService.paginateWithRelations>) {
        return this.relationPaginationService.paginateWithRelations(...args);
    }

    validatePaginationParams(...args: Parameters<typeof this.basePaginationService.validatePaginationParams>) {
        return this.basePaginationService.validatePaginationParams(...args);
    }

    generatePaginationMetadata(...args: Parameters<typeof this.paginationMetadataService.generatePaginationMetadata>) {
        return this.paginationMetadataService.generatePaginationMetadata(...args);
    }
}

