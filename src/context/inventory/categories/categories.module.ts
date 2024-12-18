import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
