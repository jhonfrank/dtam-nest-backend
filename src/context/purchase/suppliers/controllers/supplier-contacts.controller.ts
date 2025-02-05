import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CreateSupplierContactDto } from '../dto/create-supplier-contact.dto';
import { UpdateSupplierContactDto } from '../dto/update-supplier-contact.dto';
import { SupplierContactsService } from '../services/supplier-contacts.service';

@Controller('suppliers/:supplierId/contacts')
export class SupplierContactsController {
  constructor(
    private readonly supplierContactsService: SupplierContactsService,
  ) {}

  @Post()
  create(
    @Param('supplierId', ParseUUIDPipe) supplierId: string,
    @Body() createSupplierContactDto: CreateSupplierContactDto,
  ) {
    return this.supplierContactsService.create(
      supplierId,
      createSupplierContactDto,
    );
  }

  @Get()
  findAll(@Param('supplierId', ParseUUIDPipe) supplierId: string) {
    return this.supplierContactsService.findAll(supplierId);
  }

  @Get(':id')
  findOne(
    @Param('supplierId', ParseUUIDPipe) supplierId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.supplierContactsService.findOne(supplierId, id);
  }

  @Patch(':id')
  update(
    @Param('supplierId', ParseUUIDPipe) supplierId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupplierContactDto: UpdateSupplierContactDto,
  ) {
    return this.supplierContactsService.update(
      supplierId,
      id,
      updateSupplierContactDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('supplierId', ParseUUIDPipe) supplierId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.supplierContactsService.remove(supplierId, id);
  }
}
