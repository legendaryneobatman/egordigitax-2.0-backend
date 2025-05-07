// Базовый класс репозитория
import { IRepository } from '../IRepository';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PrismaOrmRepository<T> implements IRepository<T> {
  protected constructor(protected prisma: PrismaService) {}

  abstract get model(): {
    findUnique: (args: { where: { id: number } }) => Promise<T | null>;
    findMany: () => Promise<T[]>;
    create: (args: { data: Omit<T, 'id'> }) => Promise<T>;
    update: (args: { where: { id: number }; data: Partial<T> }) => Promise<T>;
    delete: (args: { where: { id: number } }) => Promise<T>;
  };

  async findOne(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
