import { Global, Module } from '@nestjs/common';

import { UnitOfWorkService } from './unit-of-work.service';

@Global()
@Module({
  controllers: [],
  providers: [UnitOfWorkService],
  exports: [UnitOfWorkService],
})
export class UnitOfWorkModule {}
