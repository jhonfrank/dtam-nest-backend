import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitsService {
    constructor(
        @InjectRepository(Unit)
        private unitRepository: Repository<Unit>,
    ) {}

    async create(createUnitDto: CreateUnitDto): Promise<Unit> {
        const unit = this.unitRepository.create({
            id: uuidv4(),
            ...createUnitDto,
            createdAt: new Date(),
            createdBy: NIL_UUID,
            updatedAt: new Date(),
            updatedBy: NIL_UUID,
        });

        return await this.unitRepository.save(unit);
    }

    async findAll(): Promise<Unit[]> {
        return await this.unitRepository.find();
    }

    async findOne(id: string): Promise<Unit> {
        return await this.unitRepository.findOneBy({ id });
    }

    async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
        const unit = await this.unitRepository.findOneBy({ id });

        if (!unit) {
            throw new NotFoundException(`Unit with ID ${id} not found`);
        }

        this.unitRepository.merge(unit, {
            ...updateUnitDto,
            updatedAt: new Date(),
            updatedBy: NIL_UUID,
        });

        return await this.unitRepository.save(unit);
    }

    async remove(id: string): Promise<void> {
        const unit = await this.unitRepository.findOneBy({ id });

        if (!unit) {
            throw new NotFoundException(`Unit with ID ${id} not found`);
        }

        await this.unitRepository.delete(id);
    }
}
