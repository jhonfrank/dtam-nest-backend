import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { InTransaction } from 'src/context/common/validators/in-transaction.decorator';
import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CorrelativeProductMainSkusService } from './correlative-product-main-skus.service';
import { CorrelativeProductVariantSkusService } from './correlative-product-variant-skus.service';
import { CategoriesService } from '../../categories/categories.service';
import { CreateProductMainDto } from '../dto/create-product-main.dto';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { ProductVariationAttribute } from '../entities/product-variation-attribute.entity';
import {
  ProductVariation,
  ProductVariationType,
} from '../entities/product-variation.entity';
import { Product } from '../entities/product.entity';
import { ProductVariationsManager } from '../managers/product-variations.manager';

@Injectable()
export class ProductVariationsService {
  constructor(
    private unitOfWork: UnitOfWorkService,
    private correlativeProductMainSkusService: CorrelativeProductMainSkusService,
    private correlativeProductVariantSkusService: CorrelativeProductVariantSkusService,
    private categoriesService: CategoriesService,
  ) {}

  get productVariationRepository() {
    return this.unitOfWork.getRepository(ProductVariation);
  }

  get productVariationAttributeRepository() {
    return this.unitOfWork.getRepository(ProductVariationAttribute);
  }

  get productRepository() {
    return this.unitOfWork.getRepository(Product);
  }

  async createMain(
    productId: string,
    createProductMainDto: CreateProductMainDto,
  ): Promise<ProductVariation> {
    const existingProductVariationMain =
      await this.productVariationRepository.existsBy({
        productId,
        type: ProductVariationType.MAIN,
      });

    if (existingProductVariationMain) {
      throw new BadRequestException(
        `A main variation for the Product with ID ${productId} already exists`,
      );
    }

    return await this.unitOfWork.transaction(async () => {
      const now = new Date();
      const productMainSku = await this.createProductMainSku(productId, now);

      const productVariant = this.productVariationRepository.create({
        id: uuidv4(),
        ...createProductMainDto,
        type: ProductVariationType.MAIN,
        sku: productMainSku,
        productId,
        createdAt: now,
        createdBy: NIL_UUID,
        updatedAt: now,
        updatedBy: NIL_UUID,
      });

      return this.productVariationRepository.save(productVariant);
    });
  }

  async createVariant(
    productId: string,
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariation> {
    const hasUniqueIds = ProductVariationsManager.checkUniqueAttributeIds(
      createProductVariantDto.attributes,
    );

    if (!hasUniqueIds) {
      throw new BadRequestException(
        `The body does not have unique AttributeIds`,
      );
    }

    const result = await this.productVariationRepository
      .createQueryBuilder('product_variation')
      .innerJoin(
        'product_variation.productVariationAttributes',
        'product_variation_attribute',
      )
      .select([
        'product_variation.id AS "productVariationId"',
        'product_variation_attribute.attribute_id AS "attributeId"',
        'product_variation_attribute.attribute_value_id AS "attributeValueId"',
      ])
      .where(
        'product_variation.product_id = :productId AND product_variation.type = :type',
        {
          productId,
          type: ProductVariationType.VARIANT,
        },
      )
      .orderBy({
        'product_variation.id': 'ASC',
        'product_variation_attribute.attribute_id': 'ASC',
        'product_variation_attribute.attribute_value_id': 'ASC',
      })
      .getRawMany();

    const listExistingAttributes =
      ProductVariationsManager.groupAttributeResult(result);

    const existingAttributes = ProductVariationsManager.existsAttributes(
      createProductVariantDto.attributes,
      listExistingAttributes,
    );

    if (existingAttributes) {
      throw new BadRequestException(
        `A variation for the attribute list already exists`,
      );
    }

    return await this.unitOfWork.transaction(async () => {
      const now = new Date();
      const productVariantSku = await this.createProductVariantSku(
        productId,
        now,
      );

      const productVariant = this.productVariationRepository.create({
        id: uuidv4(),
        ...createProductVariantDto,
        type: ProductVariationType.VARIANT,
        sku: productVariantSku,
        productId,
        createdAt: now,
        createdBy: NIL_UUID,
        updatedAt: now,
        updatedBy: NIL_UUID,
      });

      await this.productVariationRepository.save(productVariant);

      const productVariantAttributesToSave =
        createProductVariantDto.attributes.map((attribute) => {
          return this.productVariationAttributeRepository.create({
            id: uuidv4(),
            productVariationId: productVariant.id,
            attributeId: attribute.attributeId,
            attributeValueId: attribute.attributeValueId,
            createdAt: now,
            createdBy: NIL_UUID,
            updatedAt: now,
            updatedBy: NIL_UUID,
          });
        });

      await this.productVariationAttributeRepository.save(
        productVariantAttributesToSave,
      );

      return productVariant;
    });
  }

  async findAll(productId: string): Promise<ProductVariation[]> {
    return await this.productVariationRepository.findBy({ productId });
  }

  async findOne(productId: string, id: string): Promise<ProductVariation> {
    return await this.productVariationRepository.findOneBy({ productId, id });
  }

  /*
  async update(
    productId: string,
    id: string,
    updateProductVariationDto: UpdateProductVariationDto,
  ): Promise<ProductVariation> {
    const productVariation = await this.productVariationRepository.findOneBy({
      productId,
      id,
    });

    if (!productVariation) {
      throw new NotFoundException(`Product Variation with ID ${id} not found`);
    }

    this.productVariationRepository.merge(productVariation, {
      ...updateProductVariationDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.productVariationRepository.save(productVariation);
  }

  async remove(productId: string, id: string): Promise<void> {
    const productVariation = await this.productVariationRepository.findOneBy({
      productId,
      id,
    });

    if (!productVariation) {
      throw new NotFoundException(`Product Variation with ID ${id} not found`);
    }

    await this.productVariationRepository.delete(id);
  }
  */

  @InTransaction()
  private async createProductMainSku(
    productId: string,
    now: Date,
  ): Promise<string> {
    const product = await this.productRepository.findOneBy({ id: productId });
    const category = await this.categoriesService.findOne(product.categoryId);
    const year = now.getFullYear();
    const correlativeProductMainSku =
      await this.correlativeProductMainSkusService.generate(category.id, now);

    const sku = ProductVariationsManager.encodeSku(
      category.code,
      year,
      correlativeProductMainSku.correlative,
      0,
    );

    return Promise.resolve(sku);
  }

  @InTransaction()
  private async createProductVariantSku(
    productId: string,
    now: Date,
  ): Promise<string> {
    const productVariationMain =
      await this.productVariationRepository.findOneBy({
        productId,
        type: ProductVariationType.MAIN,
      });

    if (!productVariationMain) {
      throw new NotFoundException(
        `Variation Main for Product ID ${productId} not found`,
      );
    }

    const decodeProductVariationMainSku = ProductVariationsManager.decodeSku(
      productVariationMain.sku,
    );

    const correlativeProductVariantSku =
      await this.correlativeProductVariantSkusService.generate(productId, now);

    const sku = ProductVariationsManager.encodeSku(
      decodeProductVariationMainSku.categoryCode,
      decodeProductVariationMainSku.year,
      decodeProductVariationMainSku.correlativeProduct,
      correlativeProductVariantSku.correlative,
    );

    return Promise.resolve(sku);
  }
}
