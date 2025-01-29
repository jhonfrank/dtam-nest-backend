import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';

export enum ProductSkuType {
  MAIN = 'main',
  VARIANT = 'variant',
}

@Entity()
export class ProductSku {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 13, unique: true })
  sku: string;

  @Column({ type: 'enum', enum: ProductSkuType })
  type: ProductSkuType;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'uuid' })
  createdBy: string;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'uuid' })
  updatedBy: string;

  @VersionColumn()
  _v: number;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.productSkus)
  product: Product;
}
