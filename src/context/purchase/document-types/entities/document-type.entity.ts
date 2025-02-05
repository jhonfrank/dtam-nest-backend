import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  VersionColumn,
} from 'typeorm';

import { Supplier } from '../../suppliers/entities/supplier.entity';

@Entity()
export class DocumentType {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  shortName: string;

  @Column({ type: 'varchar', length: 255 })
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

  @OneToMany(() => Supplier, (supplier) => supplier.documentType)
  suppliers: Supplier[];
}
