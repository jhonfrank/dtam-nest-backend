import { Module } from '@nestjs/common';

import { BatchesService } from './batches.service';
import { BatchesController } from './batches.controller';

import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [BatchesController],
  providers: [BatchesService],
})
export class BatchesModule {}
