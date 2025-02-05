import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  OneToMany,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

import { Product } from '../../products/entities/product.entity';

@Entity({ schema: Context.INVENTORY })
export class Brand {
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

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
