import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

import { UnitOfWorkService } from '../shared/unit-of-work/unit-of-work.service';

@Injectable()
export class BrandsService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get brandRepository() {
    return this.unitOfWork.getRepository(Brand);
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create({
      id: uuidv4(),
      ...createBrandDto,
      createdAt: new Date(),
      createdBy: NIL_UUID,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.brandRepository.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: string): Promise<Brand> {
    return await this.brandRepository.findOneBy({ id });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    this.brandRepository.merge(brand, {
      ...updateBrandDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.brandRepository.save(brand);
  }

  async remove(id: string): Promise<void> {
    const brand = await this.brandRepository.findOneBy({ id });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    await this.brandRepository.delete(id);
  }
}
