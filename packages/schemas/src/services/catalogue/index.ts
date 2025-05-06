import * as DTO from './dto';

export * as DTO from './dto'

export type CatalogueServicePatterns = {
  PRODUCT: {
    FIND_ONE_PRODUCT: {
      request: DTO.PRODUCT.FindOneProductRequest;
      response: DTO.PRODUCT.FindOneProductResponse;
    };
    FIND_MANY_PRODUCT: {
      request: DTO.PRODUCT.FindManyProductRequest;
      response: DTO.PRODUCT.FindManyProductResponse;
    };
  }
};
