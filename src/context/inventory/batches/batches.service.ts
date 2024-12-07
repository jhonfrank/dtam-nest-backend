import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import { customAlphabet } from 'nanoid';

import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Batch } from './entities/batch.entity';

const ALPHABET = '1234567890ABCDEFGHIJKLMNPQRSTUVWXYZ';
const nanoid = customAlphabet(ALPHABET, 10);

@Injectable()
export class BatchesService {
  constructor(
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    const code = nanoid();
    const batch = this.batchRepository.create({
      id: uuidv4(),
      ...createBatchDto,
      code: code,
      createdAt: new Date(),
      createdBy: NIL_UUID,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.batchRepository.save(batch);
  }

  async findAll(): Promise<Batch[]> {
    return await this.batchRepository.find();
  }

  async findOne(id: string): Promise<Batch> {
    return await this.batchRepository.findOneBy({ id });
  }

  async update(id: string, updateBatchDto: UpdateBatchDto): Promise<Batch> {
    const batch = await this.batchRepository.findOneBy({ id });

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }

    this.batchRepository.merge(batch, {
      ...updateBatchDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.batchRepository.save(batch);
  }

  async remove(id: string): Promise<void> {
    const batch = await this.batchRepository.findOneBy({ id });

    if (!batch) {
      throw new NotFoundException(`Batch with ID ${id} not found`);
    }

    await this.batchRepository.delete(id);
  }
}
