import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { InTransaction } from 'src/context/shared/validators/in-transaction.decorator';

import { UnitOfWorkService } from '../../shared/unit-of-work/unit-of-work.service';
import { CorrelativeProductMainSku } from '../entities/correlative-product-main-sku.entity';

@Injectable()
export class CorrelativeProductMainSkusService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get correlativeProductMainSkuRepository() {
    return this.unitOfWork.getRepository(CorrelativeProductMainSku);
  }

  @InTransaction()
  async generate(
    categoryId: string,
    now: Date,
  ): Promise<CorrelativeProductMainSku> {
    const correlativeProductMainSku =
      await this.correlativeProductMainSkuRepository.findOneBy({
        year: now.getFullYear(),
        categoryId,
      });

    if (!correlativeProductMainSku) {
      return this.create(categoryId, now);
    } else {
      return this.increment(correlativeProductMainSku, now);
    }
  }

  @InTransaction()
  private async create(
    categoryId: string,
    now: Date,
  ): Promise<CorrelativeProductMainSku> {
    const correlativeProductMainSku =
      this.correlativeProductMainSkuRepository.create({
        id: uuidv4(),
        year: now.getFullYear(),
        correlative: 1,
        categoryId,
        createdAt: now,
        createdBy: NIL_UUID,
        updatedAt: now,
        updatedBy: NIL_UUID,
      });

    return await this.correlativeProductMainSkuRepository.save(
      correlativeProductMainSku,
    );
  }

  @InTransaction()
  private async increment(
    correlativeProductMainSku: CorrelativeProductMainSku,
    now: Date,
  ): Promise<CorrelativeProductMainSku> {
    this.correlativeProductMainSkuRepository.merge(correlativeProductMainSku, {
      correlative: correlativeProductMainSku.correlative + 1,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.correlativeProductMainSkuRepository.save(
      correlativeProductMainSku,
    );
  }
}
