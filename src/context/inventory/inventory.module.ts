import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AttributesModule } from './attributes/attributes.module';
import { BatchStatesModule } from './batch-states/batch-states.module';
import { BatchesModule } from './batches/batches.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ProductsModule } from './products/products.module';
import { UnitsModule } from './units/units.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { Context } from '../common/enums/context.enum';

const inventoryModuleList = [
  UnitsModule,
  CurrenciesModule,
  CategoriesModule,
  BrandsModule,
  ProductsModule,
  BatchesModule,
  BatchStatesModule,
  WarehousesModule,
  AttributesModule,
];

@Module({
  imports: [
    ...inventoryModuleList,
    RouterModule.register(
      inventoryModuleList.map((module) => ({
        path: Context.INVENTORY,
        module: module,
      })),
    ),
  ],
  controllers: [],
  providers: [],
})
export class InventoryModule {}
