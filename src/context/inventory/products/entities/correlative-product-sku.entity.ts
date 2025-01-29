import { Entity, PrimaryColumn, Column, VersionColumn, Index } from 'typeorm';

@Entity()
@Index(['year', 'categoryId'], { unique: true })
export class CorrelativeProductSku {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  correlativeProduct: number;

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
