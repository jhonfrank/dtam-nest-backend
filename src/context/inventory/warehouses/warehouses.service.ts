import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create({
      id: uuidv4(),
      ...createWarehouseDto,
      createdAt: new Date(),
      createdBy: NIL_UUID,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.warehouseRepository.save(warehouse);
  }

  async findAll(): Promise<Warehouse[]> {
    return await this.warehouseRepository.find();
  }

  async findOne(id: string): Promise<Warehouse> {
    return await this.warehouseRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOneBy({ id });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    this.warehouseRepository.merge(warehouse, {
      ...updateWarehouseDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.warehouseRepository.save(warehouse);
  }

  async remove(id: string): Promise<void> {
    const warehouse = await this.warehouseRepository.findOneBy({ id });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }

    await this.warehouseRepository.delete(id);
  }
}
