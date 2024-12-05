import { Entity, PrimaryColumn, Column, VersionColumn } from 'typeorm';

@Entity()
export class Unit {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 1023 })
    description: string;

    @Column({ type: 'char', length: 2, unique: true })
    code: string;

    @Column({ type: 'boolean' })
    isActive: boolean;

    @Column({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'uuid', nullable: true })
    createdBy: string;

    @Column({ type: 'timestamptz', nullable: true })
    updatedAt: Date;

    @Column({ type: 'uuid', nullable: true })
    updatedBy: string;

    @VersionColumn()
    _v: number;
}
