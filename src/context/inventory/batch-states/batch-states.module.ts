import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BatchStatesService } from './batch-states.service';
import { BatchStatesController } from './batch-states.controller';
import { BatchState } from './entities/batch-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BatchState])],
  controllers: [BatchStatesController],
  providers: [BatchStatesService],
})
export class BatchStatesModule {}
