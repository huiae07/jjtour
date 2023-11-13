import { DataSource } from 'typeorm';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  migrations: ['src/migrations/*.ts'],
  logging: false,
  ssl: false,
  entities: ['src/module/**/entity/*.entity.ts'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default AppDataSource;
