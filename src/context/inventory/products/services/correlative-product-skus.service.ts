import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { InTransaction } from 'src/context/shared/validators/in-transaction.decorator';

import { UnitOfWorkService } from '../../shared/unit-of-work/unit-of-work.service';
import { CorrelativeProductSku } from '../entities/correlative-product-sku.entity';

@Injectable()
export class CorrelativeProductSkusService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get correlativeProductSkuRepository() {
    return this.unitOfWork.getRepository(CorrelativeProductSku);
  }

  @InTransaction()
  async generate(
    categoryId: string,
    now: Date,
  ): Promise<CorrelativeProductSku> {
    const correlativeProductSku =
      await this.correlativeProductSkuRepository.findOneBy({
        year: now.getFullYear(),
        categoryId,
      });

    if (!correlativeProductSku) {
      return this.create(categoryId, now);
    } else {
      return this.increment(correlativeProductSku, now);
    }
  }

  @InTransaction()
  private async create(
    categoryId: string,
    now: Date,
  ): Promise<CorrelativeProductSku> {
    const correlativeProductSku = this.correlativeProductSkuRepository.create({
      id: uuidv4(),
      year: now.getFullYear(),
      correlativeProduct: 1,
      categoryId,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.correlativeProductSkuRepository.save(
      correlativeProductSku,
    );
  }

  @InTransaction()
  private async increment(
    correlativeProductSku: CorrelativeProductSku,
    now: Date,
  ): Promise<CorrelativeProductSku> {
    this.correlativeProductSkuRepository.merge(correlativeProductSku, {
      correlativeProduct: correlativeProductSku.correlativeProduct + 1,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.correlativeProductSkuRepository.save(
      correlativeProductSku,
    );
  }
}
