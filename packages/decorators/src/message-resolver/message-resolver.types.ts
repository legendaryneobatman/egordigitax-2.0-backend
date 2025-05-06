// message-resolver.types.ts
export type MicroserviceSchema = Record<
  string,
  Record<string, { request: unknown; response: unknown }>
>;

export type PatternType<T extends MicroserviceSchema> = {
  [Resource in keyof T]: {
    [Method in keyof T[Resource]]: `${string & Resource}.${string & Method}`
  }[keyof T[Resource]]
}[keyof T];

export type RequestType<
  T extends MicroserviceSchema,
  P extends PatternType<T>
> = P extends `${infer R}.${infer M}`
  ? R extends keyof T
    ? M extends keyof T[R]
      ? T[R][M]['request']
      : never
    : never
  : never;

export type ResponseType<
  T extends MicroserviceSchema,
  P extends PatternType<T>
> = P extends `${infer R}.${infer M}`
  ? R extends keyof T
    ? M extends keyof T[R]
      ? T[R][M]['response']
      : never
    : never
  : never;
