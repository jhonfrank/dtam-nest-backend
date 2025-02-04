import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributesService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get attributeRepository() {
    return this.unitOfWork.getRepository(Attribute);
  }

  async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    const attribute = this.attributeRepository.create({
      id: uuidv4(),
      ...createAttributeDto,
      createdAt: new Date(),
      createdBy: NIL_UUID,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.attributeRepository.save(attribute);
  }

  async findAll(): Promise<Attribute[]> {
    return await this.attributeRepository.find();
  }

  async findOne(id: string): Promise<Attribute> {
    return await this.attributeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOneBy({ id });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${id} not found`);
    }

    this.attributeRepository.merge(attribute, {
      ...updateAttributeDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.attributeRepository.save(attribute);
  }

  async remove(id: string): Promise<void> {
    const attribute = await this.attributeRepository.findOneBy({ id });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${id} not found`);
    }

    await this.attributeRepository.delete(id);
  }
}
