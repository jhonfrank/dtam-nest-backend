import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  OneToMany,
} from 'typeorm';

import { AttributeValue } from './attribute-value.entity';
import { ProductVariationAttribute } from '../../products/entities/product-variation-attribute.entity';

@Entity()
export class Attribute {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

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

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  attributeValues: AttributeValue[];

  @OneToMany(
    () => ProductVariationAttribute,
    (productVariationAttribute) => productVariationAttribute.attribute,
  )
  productVariationAttributes: ProductVariationAttribute[];
}
