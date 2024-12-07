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

import { BatchStatesService } from './batch-states.service';
import { CreateBatchStateDto } from './dto/create-batch-state.dto';
import { UpdateBatchStateDto } from './dto/update-batch-state.dto';

@Controller(Context.INVENTORY + '/batch-states')
export class BatchStatesController {
  constructor(private readonly batchStatesService: BatchStatesService) {}

  @Post()
  create(@Body() createBatchStateDto: CreateBatchStateDto) {
    return this.batchStatesService.create(createBatchStateDto);
  }

  @Get()
  findAll() {
    return this.batchStatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.batchStatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBatchStateDto: UpdateBatchStateDto,
  ) {
    return this.batchStatesService.update(id, updateBatchStateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.batchStatesService.remove(id);
  }
}
