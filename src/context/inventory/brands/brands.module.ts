import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand } from './entities/brand.entity';

@Module({
  controllers: [BrandsController],
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandsService],
})
export class BrandsModule {}
