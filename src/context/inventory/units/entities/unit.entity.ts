import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Unit {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'char', length: 2, unique: true })
  code: string;

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

  @OneToMany(() => Product, (product) => product.unit)
  products: Product[];
}
