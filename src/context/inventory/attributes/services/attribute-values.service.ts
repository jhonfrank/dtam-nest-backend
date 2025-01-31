import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from '../../shared/unit-of-work/unit-of-work.service';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeValuesService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get attributeValueRepository() {
    return this.unitOfWork.getRepository(AttributeValue);
  }

  get attributeRepository() {
    return this.unitOfWork.getRepository(Attribute);
  }

  async create(
    attributeId: string,
    createAttributeValueDto: CreateAttributeValueDto,
  ): Promise<AttributeValue> {
    const attribute = await this.attributeRepository.findOneBy({
      id: attributeId,
    });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${attributeId} not found`);
    }

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
    const attribute = await this.attributeRepository.findOneBy({
      id: attributeId,
    });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${attributeId} not found`);
    }

    return await this.attributeValueRepository.findBy({ attributeId });
  }

  async findOne(attributeId: string, id: string): Promise<AttributeValue> {
    const attribute = await this.attributeRepository.findOneBy({
      id: attributeId,
    });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${attributeId} not found`);
    }

    return await this.attributeValueRepository.findOneBy({ id });
  }

  async update(
    attributeId: string,
    id: string,
    updateAttributeValueDto: UpdateAttributeValueDto,
  ): Promise<AttributeValue> {
    const attribute = await this.attributeRepository.findOneBy({
      id: attributeId,
    });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${attributeId} not found`);
    }

    const attributeValue = await this.attributeValueRepository.findOneBy({
      id,
    });

    if (!attributeValue) {
      throw new NotFoundException(`Attribute Value with ID ${id} not found`);
    }

    this.attributeValueRepository.merge(attributeValue, {
      ...updateAttributeValueDto,
      attributeId,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.attributeValueRepository.save(attribute);
  }

  async remove(attributeId: string, id: string): Promise<void> {
    const attribute = await this.attributeRepository.findOneBy({
      id: attributeId,
    });

    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${attributeId} not found`);
    }

    const attributeValue = await this.attributeValueRepository.findOneBy({
      id,
    });

    if (!attributeValue) {
      throw new NotFoundException(`Attribute Value with ID ${id} not found`);
    }

    await this.attributeValueRepository.delete(id);
  }
}
