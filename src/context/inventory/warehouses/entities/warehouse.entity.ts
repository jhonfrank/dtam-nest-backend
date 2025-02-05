import { Entity, PrimaryColumn, Column, VersionColumn } from 'typeorm';

import { Context } from 'src/context/common/enums/context.enum';

@Entity({ schema: Context.INVENTORY })
export class Warehouse {
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
}
