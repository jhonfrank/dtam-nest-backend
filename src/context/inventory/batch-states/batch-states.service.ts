import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { CreateBatchStateDto } from './dto/create-batch-state.dto';
import { UpdateBatchStateDto } from './dto/update-batch-state.dto';
import { BatchState } from './entities/batch-state.entity';

@Injectable()
export class BatchStatesService {
  constructor(
    @InjectRepository(BatchState)
    private batchStateRepository: Repository<BatchState>,
  ) {}

  async create(createBatchStateDto: CreateBatchStateDto): Promise<BatchState> {
    const batchState = this.batchStateRepository.create({
      id: uuidv4(),
      ...createBatchStateDto,
      createdAt: new Date(),
      createdBy: NIL_UUID,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.batchStateRepository.save(batchState);
  }

  async findAll(): Promise<BatchState[]> {
    return await this.batchStateRepository.find();
  }

  async findOne(id: string): Promise<BatchState> {
    return await this.batchStateRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateBatchStateDto: UpdateBatchStateDto,
  ): Promise<BatchState> {
    const batchState = await this.batchStateRepository.findOneBy({ id });

    if (!batchState) {
      throw new NotFoundException(`Batch State with ID ${id} not found`);
    }

    this.batchStateRepository.merge(batchState, {
      ...updateBatchStateDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.batchStateRepository.save(batchState);
  }

  async remove(id: string): Promise<void> {
    const batchState = await this.batchStateRepository.findOneBy({ id });

    if (!batchState) {
      throw new NotFoundException(`Batch State with ID ${id} not found`);
    }

    await this.batchStateRepository.delete(id);
  }
}
