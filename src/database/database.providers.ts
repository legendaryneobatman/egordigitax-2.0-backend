import { DataSource } from 'typeorm';
import * as process from 'node:process';

const isInProduction = process.env.NODE_ENV === 'production';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DB_URL,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: !isInProduction,
      });

      return dataSource.initialize();
    },
  },
];
