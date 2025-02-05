import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

import { Attribute } from './attribute.entity';
import { ProductVariationAttribute } from '../../products/entities/product-variation-attribute.entity';

@Entity({ schema: Context.INVENTORY })
export class AttributeValue {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;

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
  attributeId: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.attributeValues)
  attribute: Attribute;

  @OneToMany(
    () => ProductVariationAttribute,
    (productVariationAttribute) => productVariationAttribute.attributeValue,
  )
  productVariationAttributes: ProductVariationAttribute[];
}
