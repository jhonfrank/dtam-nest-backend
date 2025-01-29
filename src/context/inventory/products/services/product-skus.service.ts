import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { InTransaction } from 'src/context/shared/validators/in-transaction.decorator';

import { CorrelativeProductSkusService } from './correlative-product-skus.service';
import { CorrelativeProductVariantSkusService } from './correlative-product-variant-skus.service';
import { CategoriesService } from '../../categories/categories.service';
import { UnitOfWorkService } from '../../shared/unit-of-work/unit-of-work.service';
import { ProductSku, ProductSkuType } from '../entities/product-sku.entity';
import { Product } from '../entities/product.entity';
import { ProductSkuManager } from '../managers/product-sku.manager';

@Injectable()
export class ProductSkusService {
  constructor(
    private unitOfWork: UnitOfWorkService,
    private categoriesService: CategoriesService,
    private correlativeProductSkusService: CorrelativeProductSkusService,
    private correlativeProductVariantSkusService: CorrelativeProductVariantSkusService,
  ) {}

  get productSkuRepository() {
    return this.unitOfWork.getRepository(ProductSku);
  }

  get productRepository() {
    return this.unitOfWork.getRepository(Product);
  }

  @InTransaction()
  async createMain(product: Product, now: Date): Promise<ProductSku> {
    const category = await this.categoriesService.findOne(product.categoryId);
    const year = now.getFullYear();
    const correlativeProductSku =
      await this.correlativeProductSkusService.generate(category.id, now);

    const sku = ProductSkuManager.encodeSku(
      category.code,
      year,
      correlativeProductSku.correlativeProduct,
      0,
    );

    const productSku = this.productSkuRepository.create({
      id: uuidv4(),
      sku,
      type: ProductSkuType.MAIN,
      productId: product.id,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.productSkuRepository.save(productSku);
  }

  @InTransaction()
  async createVariant(productId: string, now: Date): Promise<ProductSku> {
    const productSkuMain = await this.productSkuRepository.findOneBy({
      productId,
      type: ProductSkuType.MAIN,
    });

    const decodeProductSkuMain = ProductSkuManager.decodeSku(
      productSkuMain.sku,
    );

    const correlativeProductVariantSku =
      await this.correlativeProductVariantSkusService.generateVariant(
        productId,
        now,
      );

    const sku = ProductSkuManager.encodeSku(
      decodeProductSkuMain.categoryCode,
      decodeProductSkuMain.year,
      decodeProductSkuMain.correlativeProduct,
      correlativeProductVariantSku.correlativeProductVariant,
    );

    const productSku = this.productSkuRepository.create({
      id: uuidv4(),
      sku,
      type: ProductSkuType.VARIANT,
      productId,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.productSkuRepository.save(productSku);
  }

  async findByProductId(productId: string): Promise<ProductSku[]> {
    return await this.productSkuRepository.findBy({ productId });
  }

  async findMain(productId: string): Promise<ProductSku[]> {
    return await this.productSkuRepository.findBy({
      productId,
      type: ProductSkuType.MAIN,
    });
  }

  async findVariant(productId: string): Promise<ProductSku[]> {
    return await this.productSkuRepository.findBy({
      productId,
      type: ProductSkuType.VARIANT,
    });
  }
}
