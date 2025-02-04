import * as path from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { NodeEnv } from 'src/context/common/enums/node-env.enum';

import * as packageJson from '../../package.json';

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  const baseConfig = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
      application_name: packageJson.name,
    },
  };

  const configs = {
    [NodeEnv.DEVELOPMENT]: {
      ...baseConfig,
      synchronize: !!process.env.DB_SYNC,
      logging: true,
      ssl: false,
    },
    [NodeEnv.PRODUCTION]: {
      ...baseConfig,
      synchronize: false,
      logging: false,
      ssl: { rejectUnauthorized: false },
    },
  };

  return {
    ...configs[process.env.NODE_ENV as NodeEnv],
  };
}
