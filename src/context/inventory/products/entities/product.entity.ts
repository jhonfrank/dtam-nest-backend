import Decimal from 'decimal.js';
import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { DecimalTransformer } from 'src/context/shared/transformers/decimal.transformer';

import { ProductVariation } from './product-variation.entity';
import { Batch } from '../../batches/entities/batch.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';
import { Unit } from '../../units/entities/unit.entity';

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

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
  categoryId: string;

  @Column({ type: 'uuid' })
  brandId: string;

  @Column({ type: 'uuid' })
  unitId: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Unit, (unit) => unit.products)
  unit: Unit;

  @OneToMany(() => Batch, (batch) => batch.product)
  batches: Batch[];

  @OneToMany(
    () => ProductVariation,
    (productVariation) => productVariation.product,
  )
  productVariations: ProductVariation[];
}
