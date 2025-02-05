import { Entity, PrimaryColumn, Column, VersionColumn, Index } from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

@Entity({ schema: Context.INVENTORY })
@Index(['year', 'categoryId'], { unique: true })
export class CorrelativeProductMainSku {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  year: number;

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

  @Column({ type: 'uuid' })
  categoryId: string;
}
