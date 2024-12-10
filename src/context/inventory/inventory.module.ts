import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { ContextEnum } from 'src/context/shared/enums/context.enum';

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
        path: ContextEnum.INVENTORY,
        module: UnitsModule,
      },
      {
        path: ContextEnum.INVENTORY,
        module: CurrenciesModule,
      },
      {
        path: ContextEnum.INVENTORY,
        module: CategoriesModule,
      },
      {
        path: ContextEnum.INVENTORY,
        module: BrandsModule,
      },
      {
        path: ContextEnum.INVENTORY,
        module: ProductsModule,
      },
      {
        path: ContextEnum.INVENTORY,
        module: BatchesModule,
      },
      {
        path: ContextEnum.INVENTORY,
        module: BatchStatesModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class InventoryModule {}
