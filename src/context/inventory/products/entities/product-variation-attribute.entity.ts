import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

import { ProductVariation } from './product-variation.entity';
import { AttributeValue } from '../../attributes/entities/attribute-value.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';

@Entity({ schema: Context.INVENTORY })
export class ProductVariationAttribute {
  @PrimaryColumn('uuid')
  id: string;

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
  productVariationId: string;

  @Column({ type: 'uuid' })
  attributeId: string;

  @Column({ type: 'uuid' })
  attributeValueId: string;

  @ManyToOne(
    () => ProductVariation,
    (productVariation) => productVariation.productVariationAttributes,
  )
  productVariation: ProductVariation;

  @ManyToOne(
    () => Attribute,
    (attribute) => attribute.productVariationAttributes,
  )
  attribute: AttributeValue;

  @ManyToOne(
    () => AttributeValue,
    (attributeValue) => attributeValue.productVariationAttributes,
  )
  attributeValue: AttributeValue;
}
