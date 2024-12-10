import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Unit } from '../../units/entities/unit.entity';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Batch } from '../../batches/entities/batch.entity';

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 4,
  })
  quantity: number;

  @Column({ type: 'char', length: 14, unique: true })
  sku: string;

  @Column({ type: 'int' })
  skuCorrelative: number;

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

  static encodeSku(
    categoryCode: string,
    year: number,
    skuCorrelative: number,
    packagingCorrelative: number,
    variantCorrelative: number,
  ): string {
    return (
      categoryCode +
      year.toString().padStart(4, '0') +
      skuCorrelative.toString().padStart(4, '0') +
      packagingCorrelative.toString().padStart(2, '0') +
      variantCorrelative.toString().padStart(2, '0')
    );
  }

  static decodeSku(sku: string): {
    categoryCode: string;
    year: number;
    skuCorrelative: number;
    packagingCorrelative: number;
    variantCorrelative: number;
  } {
    const categoryCode = sku.slice(0, 2);
    const year = parseInt(sku.slice(2, 6));
    const skuCorrelative = parseInt(sku.slice(6, 10));
    const packagingCorrelative = parseInt(sku.slice(10, 12));
    const variantCorrelative = parseInt(sku.slice(12, 14));
    return {
      categoryCode,
      year,
      skuCorrelative,
      packagingCorrelative,
      variantCorrelative,
    };
  }
}
