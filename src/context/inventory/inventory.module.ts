import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { CONTEXT_ENUM } from 'src/context/shared/enums/context.enum';

import { UnitOfWorkModule } from './shared/unit-of-work/unit-of-work.module';

import { UnitsModule } from './units/units.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { BatchesModule } from './batches/batches.module';
import { BatchStatesModule } from './batch-states/batch-states.module';
import { WarehousesModule } from './warehouses/warehouses.module';

const inventoryModuleList = [
  UnitsModule,
  CurrenciesModule,
  CategoriesModule,
  BrandsModule,
  ProductsModule,
  BatchesModule,
  BatchStatesModule,
  WarehousesModule,
];

@Module({
  imports: [
    UnitOfWorkModule,
    ...inventoryModuleList,
    RouterModule.register(
      inventoryModuleList.map((module) => ({
        path: CONTEXT_ENUM.INVENTORY,
        module: module,
      })),
    ),
  ],
  controllers: [],
  providers: [],
  exports: [UnitOfWorkModule],
})
export class InventoryModule {}
