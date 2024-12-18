import { Module } from '@nestjs/common';

import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
