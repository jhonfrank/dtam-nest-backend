import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';

import { InventoryModule } from './context/inventory/inventory.module';
import { validateEnviroment } from './config/validate-enviroment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validate: validateEnviroment,
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
