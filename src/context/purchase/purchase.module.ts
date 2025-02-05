import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { Context } from 'src/context/common/enums/context.enum';

import { DocumentTypesModule } from './document-types/document-types.module';
import { SuppliersModule } from './suppliers/suppliers.module';

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
