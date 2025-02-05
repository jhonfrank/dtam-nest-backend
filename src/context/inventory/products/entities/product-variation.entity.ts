import Decimal from 'decimal.js';
import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';
import { DecimalTransformer } from 'src/context/common/transformers/decimal.transformer';

import { ProductVariationAttribute } from './product-variation-attribute.entity';
import { Product } from './product.entity';

export enum ProductVariationType {
  MAIN = 'main',
  VARIANT = 'variant',
}

@Entity({ schema: Context.INVENTORY })
export class ProductVariation {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProductVariationType })
  type: ProductVariationType;

  @Column({ type: 'char', length: 13, unique: true })
  sku: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: new DecimalTransformer(),
  })
  quantity: Decimal;

  @Column({ type: 'boolean' })
  isActive: boolean;

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

  @ManyToOne(() => Product, (product) => product.productVariations)
  product: Product;

  @OneToMany(
    () => ProductVariationAttribute,
    (productVariationAttribute) => productVariationAttribute.productVariation,
  )
  productVariationAttributes: ProductVariationAttribute[];
}
