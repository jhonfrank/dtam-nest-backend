import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';

import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
    constructor(
        @InjectRepository(Currency)
        private currencyRepository: Repository<Currency>,
    ) {}

    async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
        const currency = this.currencyRepository.create({
            id: uuidv4(),
            ...createCurrencyDto,
            createdAt: new Date(),
            createdBy: NIL_UUID,
            updatedAt: new Date(),
            updatedBy: NIL_UUID,
        });

        return await this.currencyRepository.save(currency);
    }

    async findAll(): Promise<Currency[]> {
        return await this.currencyRepository.find();
    }

    async findOne(id: string): Promise<Currency> {
        return await this.currencyRepository.findOneBy({ id });
    }

    async update(
        id: string,
        updateCurrencyDto: UpdateCurrencyDto,
    ): Promise<Currency> {
        const currency = await this.currencyRepository.findOneBy({ id });

        if (!currency) {
            throw new NotFoundException(`Currency with ID ${id} not found`);
        }

        this.currencyRepository.merge(currency, {
            ...updateCurrencyDto,
            updatedAt: new Date(),
            updatedBy: NIL_UUID,
        });

        return await this.currencyRepository.save(currency);
    }

    async remove(id: string): Promise<void> {
        const currency = await this.currencyRepository.findOneBy({ id });

        if (!currency) {
            throw new NotFoundException(`Currency with ID ${id} not found`);
        }

        await this.currencyRepository.delete(id);
    }
}
