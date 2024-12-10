import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { Context } from 'src/context/shared/enum/context.enum';

import { UnitsModule } from './units/units.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { BatchesModule } from './batches/batches.module';
import { BatchStatesModule } from './batch-states/batch-states.module';

@Module({
  imports: [
    UnitsModule,
    CurrenciesModule,
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    BatchesModule,
    BatchStatesModule,
    RouterModule.register([
      {
        path: Context.INVENTORY,
        module: UnitsModule,
      },
      {
        path: Context.INVENTORY,
        module: CurrenciesModule,
      },
      {
        path: Context.INVENTORY,
        module: CategoriesModule,
      },
      {
        path: Context.INVENTORY,
        module: BrandsModule,
      },
      {
        path: Context.INVENTORY,
        module: ProductsModule,
      },
      {
        path: Context.INVENTORY,
        module: BatchesModule,
      },
      {
        path: Context.INVENTORY,
        module: BatchStatesModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class InventoryModule {}
