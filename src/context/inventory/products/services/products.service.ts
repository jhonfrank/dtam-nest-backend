import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { UnitOfWorkService } from 'src/context/shared/unit-of-work/unit-of-work.service';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private unitOfWork: UnitOfWorkService) {}

  get productRepository() {
    return this.unitOfWork.getRepository(Product);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.unitOfWork.transaction(async () => {
      const now = new Date();
      const product = this.productRepository.create({
        id: uuidv4(),
        ...createProductDto,
        createdAt: now,
        createdBy: NIL_UUID,
        updatedAt: now,
        updatedBy: NIL_UUID,
      });

      await this.productRepository.save(product);

      return product;
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.productRepository.merge(product, {
      ...updateProductDto,
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
}
