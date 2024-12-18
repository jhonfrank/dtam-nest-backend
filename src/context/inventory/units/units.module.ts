import { Module } from '@nestjs/common';

import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';

import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
