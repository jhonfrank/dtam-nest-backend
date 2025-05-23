import Decimal from 'decimal.js';
import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';
import { DecimalTransformer } from 'src/context/common/transformers/decimal.transformer';

import { BatchState } from '../../batch-states/entities/batch-state.entity';
import { Product } from '../../products/entities/product.entity';

const letters = [
  null,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
];

@Entity({ schema: Context.INVENTORY })
export class Batch {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 14, unique: true })
  code: string;

  @Column({ type: 'int' })
  codeCorrelative: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 4,
    transformer: new DecimalTransformer(),
  })
  quantity: Decimal;

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

  static encodeCode(
    prefix: string,
    year: number,
    month: number,
    codeCorrelative: number,
    suffix: string,
  ): string {
    return (
      prefix +
      year +
      letters[month] +
      codeCorrelative.toString().padStart(5, '0') +
      suffix
    );
  }

  static decodeCode(code: string): {
    prefix: string;
    year: number;
    month: number;
    codeCorrelative: number;
    suffix: string;
  } {
    const prefix = code.slice(0, 1);
    const year = parseInt(code.slice(1, 5));
    const month = letters.indexOf(code.slice(5, 6));
    const codeCorrelative = parseInt(code.slice(6, 11));
    const suffix = code.slice(11, 14);
    return {
      prefix,
      year,
      month,
      codeCorrelative,
      suffix,
    };
  }
}
