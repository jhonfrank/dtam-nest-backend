import { Module } from '@nestjs/common';

import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';

import { UnitOfWorkModule } from '../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
