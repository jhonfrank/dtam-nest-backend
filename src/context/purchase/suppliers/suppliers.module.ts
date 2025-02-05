import { Module } from '@nestjs/common';

import { SupplierContactsController } from './controllers/supplier-contacts.controller';
import { SuppliersController } from './controllers/suppliers.controller';
import { SupplierContactsService } from './services/supplier-contacts.service';
import { SuppliersService } from './services/suppliers.service';

@Module({
  controllers: [SuppliersController, SupplierContactsController],
  providers: [SuppliersService, SupplierContactsService],
})
export class SuppliersModule {}
