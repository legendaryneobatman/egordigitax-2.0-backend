export interface IRepository<T> {
  findOne(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  findMany(args?: {
    skip?: number;
    take?: number;
    orderBy?: any;
    where?: any;
  }): Promise<T[]>;
  count (args?: { where?: any }): Promise<number>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}
