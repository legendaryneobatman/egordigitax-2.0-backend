import dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
});


class EnvGetter<T> {
  constructor(
    private readonly key: string,
    private parseFn: (value: string) => T,
    private defaultValue?: T
  ) {}

  toString(): EnvGetter<string> {
    return new EnvGetter(this.key, (v) => v, this.defaultValue as unknown as string);
  }

  toNumber(): EnvGetter<number> {
    return new EnvGetter(this.key, (v) => Number(v), this.defaultValue as unknown as number);
  }

  toBoolean(): EnvGetter<boolean> {
    return new EnvGetter(this.key, (v) => v === 'true' || v === '1', this.defaultValue as unknown as boolean);
  }

  toStringArray(separator: string = ','): EnvGetter<string[]> {
    return new EnvGetter(
      this.key,
      (v) => v.split(separator).map(s => s.trim()),
      this.defaultValue as unknown as string[]
    );
  }

  withDefault(value: T): EnvGetter<T> {
    return new EnvGetter(this.key, this.parseFn, value);
  }

  execute(): T {
    const value = process.env[this.key];

    if (value !== undefined) {
      return this.parseFn(value);
    }

    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    throw new Error(`Environment variable '${this.key}' is not set and no default value provided`);
  }
}

export class EnvConfigurator<TSchema> {
  get<K extends keyof TSchema>(key: K): EnvGetter<string> {
    return new EnvGetter(key as string, (v) => v);
  }
}
