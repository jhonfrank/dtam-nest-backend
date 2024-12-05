import { Entity, PrimaryColumn, Column, VersionColumn } from 'typeorm';

@Entity()
export class Category {
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
