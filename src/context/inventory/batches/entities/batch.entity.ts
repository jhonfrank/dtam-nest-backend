import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { BatchState } from '../../batch-states/entities/batch-state.entity';

@Entity()
export class Batch {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 10, unique: true })
  code: string;

  @Column({ type: 'numeric', precision: 18, scale: 4 })
  quantity: number;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

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
  batchStateId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => BatchState, (batchState) => batchState.batches)
  batchState: BatchState;

  @ManyToOne(() => Product, (product) => product.batches)
  product: Product;
}
