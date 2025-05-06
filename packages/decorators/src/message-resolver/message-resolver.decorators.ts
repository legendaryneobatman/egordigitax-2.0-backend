import { MessagePattern } from '@nestjs/microservices';
import {
  MicroserviceSchema,
  PatternType,
  RequestType,
  ResponseType
} from './message-resolver.types';

export function createTypedDecorators<T extends MicroserviceSchema>() {
  return {
    // Для MessagePattern
    MessagePattern: <P extends PatternType<T>>(pattern: P) => MessagePattern(pattern),

    // Для Payload с явным указанием типа
    Payload: <P extends PatternType<T>>(pattern: P) => (
      (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
      ) => {
        // Логика декоратора
      }
    ) as ParameterDecorator,

    // Для TypedResponse
    TypedResponse: <P extends PatternType<T>>(): ResponseType<T, P> => ({} as ResponseType<T, P>)
  };
}
