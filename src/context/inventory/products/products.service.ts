import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const now = new Date();
    const sku = await this.generateSku(createProductDto.categoryId, now);
    const skuCorrelative = Product.decodeSku(sku).skuCorrelative;
    const product = this.productRepository.create({
      id: uuidv4(),
      ...createProductDto,
      sku,
      skuCorrelative,
      createdAt: now,
      createdBy: NIL_UUID,
      updatedAt: now,
      updatedBy: NIL_UUID,
    });

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: string, updateUnitDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.productRepository.merge(product, {
      ...updateUnitDto,
      updatedAt: new Date(),
      updatedBy: NIL_UUID,
    });

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.delete(id);
  }

  async generateSku(categoryId: string, now: Date): Promise<string> {
    let categoryCode;
    const year = now.getFullYear();
    let skuCorrelative;
    const packagingCorrelative = 0;
    const variantCorrelative = 0;

    const lastProduct = await this.productRepository
      .createQueryBuilder('p')
      .where(
        'p.category_id = :categoryId AND EXTRACT(YEAR FROM p.created_at) = :year',
        { categoryId, year },
      )
      .orderBy('p.sku_correlative', 'DESC')
      .limit(1)
      .getOne();

    if (!lastProduct) {
      const category = await this.categoriesService.findOne(categoryId);
      categoryCode = category.code;
      skuCorrelative = 1;
    } else {
      const decodedSku = Product.decodeSku(lastProduct.sku);

      categoryCode = decodedSku.categoryCode;
      skuCorrelative = decodedSku.skuCorrelative + 1;
    }

    const newSku = Product.encodeSku(
      categoryCode,
      year,
      skuCorrelative,
      packagingCorrelative,
      variantCorrelative,
    );

    return newSku;
  }
}
