import {PaginationService, BasePaginationService, CursorPaginationService, FilterPaginationService, PaginationMetadataService, RelationPaginationService, SearchPaginationService} from "./pagination";

export const HELPER_SERVICES_INJECT_PROVIDES = [
    PaginationService,
    BasePaginationService,
    CursorPaginationService,
    FilterPaginationService,
    PaginationMetadataService,
    RelationPaginationService,
    SearchPaginationService,
]
