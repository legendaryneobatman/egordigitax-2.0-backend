import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  ReadPacket,
  WritePacket,
} from '@nestjs/microservices';
import { TcpClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import { firstValueFrom, Observable } from 'rxjs';

type NestedPatterns = Record<string, Record<string, {
  request: unknown;
  response: unknown
}>>;

type FlatPatterns<T extends NestedPatterns> = {
  [Resource in keyof T]: {
    [Method in keyof T[Resource]]: `${Resource & string}.${Method & string}`
  }[keyof T[Resource]]
}[keyof T];

type GetRequest<T extends NestedPatterns, P extends string> =
  P extends `${infer R}.${infer M}`
    ? R extends keyof T
      ? M extends keyof T[R]
        ? T[R][M]['request']
        : never
      : never
    : never;

type GetResponse<T extends NestedPatterns, P extends string> =
  P extends `${infer R}.${infer M}`
    ? R extends keyof T
      ? M extends keyof T[R]
        ? T[R][M]['response']
        : never
      : never
    : never;

@Injectable()
export class TcpTypedClientProxy<TPatterns extends Record<string, any>>
  extends ClientProxy
  implements OnModuleInit, OnModuleDestroy
{
  unwrap<T>(): T {
    throw new Error('Method not implemented.');
  }
  protected publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
  protected dispatchEvent<T = any>(packet: ReadPacket): Promise<T> {
    throw new Error('Method not implemented.');
  }

  private client: ClientProxy;
  private isDestroyed = false;
  private retryInterval: NodeJS.Timeout | undefined;

  constructor(private readonly config: TcpClientOptions) {
    super();
    this.client = ClientProxyFactory.create(this.config);
  }

  private initClient() {
    this.client = ClientProxyFactory.create(this.config);
  }

  async connect() {
    while (!this.isDestroyed) {
      try {
        if (this.client) {
          await this.client?.connect();
          console.log('Successfully connected to TCP server');
          return;
        }
      } catch (error: any) {
        console.error(`Connection failed: ${error?.message}`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        this.initClient(); // Пересоздаем клиент для новой попытки
      }
    }
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    this.isDestroyed = true;
    if (this.retryInterval) clearTimeout(this.retryInterval);
    if (this.client) {
      await this.client?.close();
    }
  }

  send<P extends FlatPatterns<TPatterns>>(
    pattern: P,
    payload: GetRequest<TPatterns, P>,
  ): Observable<GetResponse<TPatterns, P>>;

  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    return this.client.send(pattern, data);
  }

  async sendAsync<P extends FlatPatterns<TPatterns>>(
    pattern: P,
    payload: GetRequest<TPatterns, P>,
  ): Promise<GetResponse<TPatterns, P>> {
    const source = this.send(pattern, payload);
    return firstValueFrom(source);
  }

  async close() {
    return this.client.close();
  }
}
