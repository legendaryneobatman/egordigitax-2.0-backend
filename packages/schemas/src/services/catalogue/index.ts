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
    };
    DELETE_ONE: {
      request: DTO.PRODUCT.DeleteOneProductRequest,
      response: DTO.PRODUCT.DeleteOneProductResponse
    }
  },
  ATTRIBUTE: {
    FIND_ONE_ATTRIBUTE: {
      request: DTO.ATTRIBUTE.FindOneAttributeRequest,
      response: DTO.ATTRIBUTE.FindOneAttributeResponse,
    },
    FIND_MANY_ATTRIBUTE: {
      request: DTO.ATTRIBUTE.FindManyAttributeRequest,
      response: DTO.ATTRIBUTE.FindManyAttributeResponse,
    },
    CREATE_ONE_ATTRIBUTE: {
      request: DTO.ATTRIBUTE.CreateOneAttributeRequest,
      response: DTO.ATTRIBUTE.CreateOneAttributeResponse,
    },
    UPDATE_ONE_ATTRIBUTE: {
      request: DTO.ATTRIBUTE.UpdateOneAttributeRequest,
      response: DTO.ATTRIBUTE.UpdateOneAttributeResponse,
    },
    DELETE_ONE_ATTRIBUTE: {
      request: DTO.ATTRIBUTE.DeleteOneAttributeRequest,
      response: DTO.ATTRIBUTE.DeleteOneAttributeResponse,
    }
  }
};
