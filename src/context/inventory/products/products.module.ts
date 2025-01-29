import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { CorrelativeProductSkusService } from './services/correlative-product-skus.service';
import { CorrelativeProductVariantSkusService } from './services/correlative-product-variant-skus.service';
import { ProductSkusService } from './services/product-skus.service';
import { ProductsService } from './services/products.service';
import { CategoriesModule } from '../categories/categories.module';
import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule, CategoriesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductSkusService,
    CorrelativeProductSkusService,
    CorrelativeProductVariantSkusService,
  ],
  exports: [],
})
export class ProductsModule {}
