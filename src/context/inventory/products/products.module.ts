import { Module } from '@nestjs/common';

import { ProductVariationsController } from './controllers/product-variations.controller';
import { ProductsController } from './controllers/products.controller';
import { CorrelativeProductMainSkusService } from './services/correlative-product-main-skus.service';
import { CorrelativeProductVariantSkusService } from './services/correlative-product-variant-skus.service';
import { ProductVariationsService } from './services/product-variations.service';
import { ProductsService } from './services/products.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController, ProductVariationsController],
  providers: [
    ProductsService,
    ProductVariationsService,
    CorrelativeProductMainSkusService,
    CorrelativeProductVariantSkusService,
  ],
  exports: [],
})
export class ProductsModule {}
