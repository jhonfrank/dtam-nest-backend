import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { NODE_ENV } from 'src/context/shared/enums/node-env.enum';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as packageJson from '../../package.json';

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:
      process.env.NODE_ENV === NODE_ENV.DEVELOPMENT && !!process.env.DB_SYNC,
    namingStrategy: new SnakeNamingStrategy(),
    logging: process.env.NODE_ENV === NODE_ENV.DEVELOPMENT,
    extra: {
      application_name: packageJson.name,
    },
    //dropSchema: true,
    ssl:
      process.env.NODE_ENV === NODE_ENV.PRODUCTION
        ? { rejectUnauthorized: false }
        : false,
  };
}
