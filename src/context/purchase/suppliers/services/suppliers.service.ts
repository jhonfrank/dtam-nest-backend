import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get supplierRepository() {
    return this.unitOfWork.getRepository(Supplier);
  }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const now = new Date();
    const supplier = this.supplierRepository.create({
      id: uuidv4(),
      ...createSupplierDto,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.supplierRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return await this.supplierRepository.find();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOneBy({ id });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return supplier;
  }

  async update(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const supplier = await this.findOne(id);

    this.supplierRepository.merge(supplier, {
      ...updateSupplierDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.supplierRepository.save(supplier);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.supplierRepository.delete(id);
  }
}
