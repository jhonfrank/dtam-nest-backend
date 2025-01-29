import { Module } from '@nestjs/common';

import { UnitOfWorkService } from './unit-of-work.service';

@Module({
  controllers: [],
  providers: [UnitOfWorkService],
  exports: [UnitOfWorkService],
})
export class UnitOfWorkModule {}
