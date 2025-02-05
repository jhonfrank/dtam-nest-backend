import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DocumentTypesModule } from './document-types/document-types.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Context } from '../common/enums/context.enum';

const purchaseModuleList = [SuppliersModule, DocumentTypesModule];

@Module({
  imports: [
    ...purchaseModuleList,
    RouterModule.register(
      purchaseModuleList.map((module) => ({
        path: Context.PURCHASE,
        module: module,
      })),
    ),
  ],
  controllers: [],
  providers: [],
})
export class PurchaseModule {}
