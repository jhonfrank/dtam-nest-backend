import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitOfWorkService } from './unit-of-work.service';

import { Unit } from '../../units/entities/unit.entity';
import { Currency } from '../../currencies/entities/currency.entity';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Product } from '../../products/entities/product.entity';
import { Batch } from '../../batches/entities/batch.entity';
import { BatchState } from '../../batch-states/entities/batch-state.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';

const inventoryEntityList = [
  Unit,
  Currency,
  Category,
  Brand,
  Product,
  Batch,
  BatchState,
  Warehouse,
];

@Module({
  imports: [
    ...inventoryEntityList.map((entity) => TypeOrmModule.forFeature([entity])),
  ],
  controllers: [],
  providers: [UnitOfWorkService],
  exports: [UnitOfWorkService],
})
export class UnitOfWorkModule {}
