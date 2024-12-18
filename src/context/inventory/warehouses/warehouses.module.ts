import { Module } from '@nestjs/common';

import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';

import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
