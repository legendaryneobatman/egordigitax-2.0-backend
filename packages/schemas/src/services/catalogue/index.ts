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
    CREATE_ONE_PRODUCT: {
      request: DTO.PRODUCT.CreateOneProductRequest,
      response: DTO.PRODUCT.CreateOneProductResponse,
    };
    UPDATE_ONE_PRODUCT: {
      request: DTO.PRODUCT.UpdateOneProductRequest,
      response: DTO.PRODUCT.UpdateOneProductResponse,
    }
  }
};
