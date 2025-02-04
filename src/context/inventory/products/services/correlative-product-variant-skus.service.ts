import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { InTransaction } from 'src/context/common/validators/in-transaction.decorator';
import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CorrelativeProductVariantSku } from '../entities/correlative-product-variant-sku.entity';

@Injectable()
export class CorrelativeProductVariantSkusService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get correlativeProductVariantSkuRepository() {
    return this.unitOfWork.getRepository(CorrelativeProductVariantSku);
  }

  @InTransaction()
  async generate(
    productId: string,
    now: Date,
  ): Promise<CorrelativeProductVariantSku> {
    const correlativeProductVariantSku =
      await this.correlativeProductVariantSkuRepository.findOneBy({
        productId,
      });

    if (!correlativeProductVariantSku) {
      return this.create(productId, now);
    } else {
      return this.increment(correlativeProductVariantSku, now);
    }
  }

  @InTransaction()
  private async create(
    productId: string,
    now: Date,
  ): Promise<CorrelativeProductVariantSku> {
    const correlativeProductVariantSku =
      this.correlativeProductVariantSkuRepository.create({
        id: uuidv4(),
        correlative: 1,
        productId,
        createdAt: now,
        createdBy: NIL_UUID,
        updatedAt: now,
        updatedBy: NIL_UUID,
      });

    return await this.correlativeProductVariantSkuRepository.save(
      correlativeProductVariantSku,
    );
  }

  @InTransaction()
  private async increment(
    correlativeProductVariantSku: CorrelativeProductVariantSku,
    now: Date,
  ): Promise<CorrelativeProductVariantSku> {
    this.correlativeProductVariantSkuRepository.merge(
      correlativeProductVariantSku,
      {
        correlative: correlativeProductVariantSku.correlative + 1,
        updatedAt: now,
        updatedBy: NIL_UUID,
      },
    );

    return await this.correlativeProductVariantSkuRepository.save(
      correlativeProductVariantSku,
    );
  }
}
