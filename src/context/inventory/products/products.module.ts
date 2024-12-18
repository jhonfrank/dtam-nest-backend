import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { CategoriesModule } from '../categories/categories.module';
import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule, CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
