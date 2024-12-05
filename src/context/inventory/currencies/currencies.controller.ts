import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';

import { Context } from 'src/context/shared/context.enum';

import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller(Context.INVENTORY + '/currencies')
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {}

    @Post()
    create(@Body() createCurrencyDto: CreateCurrencyDto) {
        return this.currenciesService.create(createCurrencyDto);
    }

    @Get()
    findAll() {
        return this.currenciesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.currenciesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCurrencyDto: UpdateCurrencyDto,
    ) {
        return this.currenciesService.update(id, updateCurrencyDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.currenciesService.remove(id);
    }
}
