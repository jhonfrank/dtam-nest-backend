import { Module } from '@nestjs/common';
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
  ],
  controllers: [],
  providers: [],
})
export class InventoryModule {}
