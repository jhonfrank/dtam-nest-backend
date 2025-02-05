import {
  Entity,
  PrimaryColumn,
  Column,
  VersionColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

import { SupplierContact } from './supplier-contact.entity';
import { DocumentType } from '../../document-types/entities/document-type.entity';

@Entity({ schema: Context.PURCHASE })
export class Supplier {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  legalName: string;

  @Column({ type: 'varchar', length: 255 })
  tradeName: string;

  @Column({ type: 'varchar', length: 20 })
  documentNumber: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 20 })
  locationCode: string;

  @Column({ type: 'varchar', length: 255 })
  websiteUrl: string;

  @Column({ type: 'varchar', length: 2000 })
  remarks: string;

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
  documentTypeId: string;

  @ManyToOne(() => DocumentType, (documentType) => documentType.suppliers)
  documentType: DocumentType;

  @OneToMany(
    () => SupplierContact,
    (supplierContact) => supplierContact.supplier,
  )
  supplierContacts: SupplierContact[];
}
