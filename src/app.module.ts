import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmConfig } from './config/typeorm.config';
import { validateEnviroment } from './config/validate-enviroment';
import { InventoryModule } from './context/inventory/inventory.module';
import { PurchaseModule } from './context/purchase/purchase.module';
import { UnitOfWorkModule } from './context/shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validate: validateEnviroment,
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    UnitOfWorkModule,
    InventoryModule,
    PurchaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
