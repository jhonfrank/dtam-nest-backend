import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

import { Supplier } from './supplier.entity';

@Entity({ schema: Context.PURCHASE })
export class SupplierContact {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  phone1: string;

  @Column({ type: 'varchar', length: 255 })
  phone2: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

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
  supplierId: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierContacts)
  supplier: Supplier;
}
