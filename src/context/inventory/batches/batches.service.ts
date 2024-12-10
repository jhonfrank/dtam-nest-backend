import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import * as Chance from 'chance';

import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Batch } from './entities/batch.entity';

@Injectable()
export class BatchesService {
  constructor(
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    const now = new Date();
    const code = await this.generateCode(now);
    const codeCorrelative = Batch.decodeCode(code).codeCorrelative;
    const batch = this.batchRepository.create({
      id: uuidv4(),
      ...createBatchDto,
      code,
      codeCorrelative,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
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

  async generateCode(now: Date): Promise<string> {
    const chance = new Chance();
    const pool = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';

    const prefix = chance.string({ length: 1, pool: pool, casing: 'upper' });
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    let codeCorrelative;
    const suffix = chance.string({ length: 3, pool: pool, casing: 'upper' });

    const lastBatch = await this.batchRepository
      .createQueryBuilder('b')
      .where('EXTRACT(YEAR FROM b.created_at) = :year', { year })
      .orderBy('b.code_correlative', 'DESC')
      .limit(1)
      .getOne();

    if (!lastBatch) {
      codeCorrelative = 1;
    } else {
      codeCorrelative = lastBatch.codeCorrelative + 1;
    }

    const newCode = Batch.encodeCode(
      prefix,
      year,
      month,
      codeCorrelative,
      suffix,
    );

    return newCode;
  }
}
