import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CreateSupplierContactDto } from '../dto/create-supplier-contact.dto';
import { UpdateSupplierContactDto } from '../dto/update-supplier-contact.dto';
import { SupplierContact } from '../entities/supplier-contact.entity';

@Injectable()
export class SupplierContactsService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get supplierContactRepository() {
    return this.unitOfWork.getRepository(SupplierContact);
  }

  async create(
    supplierId: string,
    createSupplierContactDto: CreateSupplierContactDto,
  ): Promise<SupplierContact> {
    const now = new Date();
    const supplierContact = this.supplierContactRepository.create({
      id: uuidv4(),
      ...createSupplierContactDto,
      supplierId,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.supplierContactRepository.save(supplierContact);
  }

  async findAll(supplierId: string): Promise<SupplierContact[]> {
    return await this.supplierContactRepository.findBy({ supplierId });
  }

  async findOne(supplierId: string, id: string): Promise<SupplierContact> {
    const supplierContact = await this.supplierContactRepository.findOneBy({
      supplierId,
      id,
    });

    if (!supplierContact) {
      throw new NotFoundException(`Supplier Contact with ID ${id} not found`);
    }

    return supplierContact;
  }

  async update(
    supplierId: string,
    id: string,
    updateSupplierContactDto: UpdateSupplierContactDto,
  ): Promise<SupplierContact> {
    const supplierContact = await this.findOne(supplierId, id);

    this.supplierContactRepository.merge(supplierContact, {
      ...updateSupplierContactDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.supplierContactRepository.save(supplierContact);
  }

  async remove(supplierId: string, id: string): Promise<void> {
    await this.findOne(supplierId, id);
    await this.supplierContactRepository.delete(id);
  }
}
