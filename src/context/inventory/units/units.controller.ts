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

import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller(Context.INVENTORY + '/units')
export class UnitsController {
    constructor(private readonly unitsService: UnitsService) {}

    @Post()
    create(@Body() createUnitDto: CreateUnitDto) {
        return this.unitsService.create(createUnitDto);
    }

    @Get()
    findAll() {
        return this.unitsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.unitsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUnitDto: UpdateUnitDto,
    ) {
        return this.unitsService.update(id, updateUnitDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.unitsService.remove(id);
    }
}
