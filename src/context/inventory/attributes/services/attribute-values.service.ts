import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { AttributeValue } from '../entities/attribute-value.entity';

@Injectable()
export class AttributeValuesService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get attributeValueRepository() {
    return this.unitOfWork.getRepository(AttributeValue);
  }

  async create(
    attributeId: string,
    createAttributeValueDto: CreateAttributeValueDto,
  ): Promise<AttributeValue> {
    const attributeValue = this.attributeValueRepository.create({
      id: uuidv4(),
      ...createAttributeValueDto,
      attributeId,
      createdAt: new Date(),
      createdBy: NIL_UUID,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.attributeValueRepository.save(attributeValue);
  }

  async findAll(attributeId: string): Promise<AttributeValue[]> {
    return await this.attributeValueRepository.findBy({ attributeId });
  }

  async findOne(attributeId: string, id: string): Promise<AttributeValue> {
    return await this.attributeValueRepository.findOneBy({ attributeId, id });
  }

  async update(
    attributeId: string,
    id: string,
    updateAttributeValueDto: UpdateAttributeValueDto,
  ): Promise<AttributeValue> {
    const attributeValue = await this.attributeValueRepository.findOneBy({
      attributeId,
      id,
    });

    if (!attributeValue) {
      throw new NotFoundException(`Attribute Value with ID ${id} not found`);
    }

    this.attributeValueRepository.merge(attributeValue, {
      ...updateAttributeValueDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.attributeValueRepository.save(attributeValue);
  }

  async remove(attributeId: string, id: string): Promise<void> {
    const attributeValue = await this.attributeValueRepository.findOneBy({
      attributeId,
      id,
    });

    if (!attributeValue) {
      throw new NotFoundException(`Attribute Value with ID ${id} not found`);
    }

    await this.attributeValueRepository.delete(id);
  }
}
