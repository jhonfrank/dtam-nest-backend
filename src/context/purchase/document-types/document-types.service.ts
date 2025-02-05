import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { DocumentType } from './entities/document-type.entity';

@Injectable()
export class DocumentTypesService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get documentTypeRepository() {
    return this.unitOfWork.getRepository(DocumentType);
  }

  async create(
    createDocumentTypeDto: CreateDocumentTypeDto,
  ): Promise<DocumentType> {
    const now = new Date();
    const documentType = this.documentTypeRepository.create({
      id: uuidv4(),
      ...createDocumentTypeDto,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.documentTypeRepository.save(documentType);
  }

  async findAll(): Promise<DocumentType[]> {
    return await this.documentTypeRepository.find();
  }

  async findOne(id: string): Promise<DocumentType> {
    const documentType = await this.documentTypeRepository.findOneBy({ id });

    if (!documentType) {
      throw new NotFoundException(`Document Type with ID ${id} not found`);
    }

    return documentType;
  }

  async update(
    id: string,
    updateDocumentTypeDto: UpdateDocumentTypeDto,
  ): Promise<DocumentType> {
    const documentType = await this.findOne(id);

    this.documentTypeRepository.merge(documentType, {
      ...updateDocumentTypeDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.documentTypeRepository.save(documentType);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.documentTypeRepository.delete(id);
  }
}
