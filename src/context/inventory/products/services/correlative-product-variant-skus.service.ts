import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { InTransaction } from 'src/context/shared/validators/in-transaction.decorator';

import { UnitOfWorkService } from '../../shared/unit-of-work/unit-of-work.service';
import { CorrelativeProductVariantSku } from '../entities/correlative-product-variant-sku.entity';

@Injectable()
export class CorrelativeProductVariantSkusService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get correlativeProductSkuVariantRepository() {
    return this.unitOfWork.getRepository(CorrelativeProductVariantSku);
  }

  @InTransaction()
  async generateVariant(
    productId: string,
    now: Date,
  ): Promise<CorrelativeProductVariantSku> {
    return await this.unitOfWork.transaction(async () => {
      const correlativeProductVariantSku =
        await this.correlativeProductSkuVariantRepository.findOneBy({
          productId,
        });

      if (!correlativeProductVariantSku) {
        return this.createVariant(productId, now);
      } else {
        return this.incrementVariant(correlativeProductVariantSku, now);
      }
    });
  }

  @InTransaction()
  private async createVariant(
    productId: string,
    now: Date,
  ): Promise<CorrelativeProductVariantSku> {
    const correlativeProductVariantSku =
      this.correlativeProductSkuVariantRepository.create({
        id: uuidv4(),
        correlativeProductVariant: 1,
        productId,
        createdAt: now,
        createdBy: NIL_UUID,
        updatedAt: now,
        updatedBy: NIL_UUID,
      });

    return await this.correlativeProductSkuVariantRepository.save(
      correlativeProductVariantSku,
    );
  }

  @InTransaction()
  private async incrementVariant(
    correlativeProductVariantSku: CorrelativeProductVariantSku,
    now: Date,
  ): Promise<CorrelativeProductVariantSku> {
    this.correlativeProductSkuVariantRepository.merge(
      correlativeProductVariantSku,
      {
        correlativeProductVariant:
          correlativeProductVariantSku.correlativeProductVariant + 1,
        updatedAt: now,
        updatedBy: NIL_UUID,
      },
    );

    return await this.correlativeProductSkuVariantRepository.save(
      correlativeProductVariantSku,
    );
  }
}
