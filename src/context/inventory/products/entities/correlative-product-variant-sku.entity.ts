import { Entity, PrimaryColumn, Column, VersionColumn } from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

@Entity({ schema: Context.INVENTORY })
export class CorrelativeProductVariantSku {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  correlative: number;

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

  @Column({ type: 'uuid', unique: true })
  productId: string;
}
