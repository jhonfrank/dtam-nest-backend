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

import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { AttributeValuesService } from '../services/attribute-values.service';

@Controller('attributes/:attributeId/values')
export class AttributeValuesController {
  constructor(
    private readonly attributeValuesService: AttributeValuesService,
  ) {}

  @Post()
  create(
    @Param('attributeId', ParseUUIDPipe) attributeId: string,
    @Body() createAttributeValueDto: CreateAttributeValueDto,
  ) {
    return this.attributeValuesService.create(
      attributeId,
      createAttributeValueDto,
    );
  }

  @Get()
  findAll(@Param('attributeId', ParseUUIDPipe) attributeId: string) {
    return this.attributeValuesService.findAll(attributeId);
  }

  @Get(':id')
  findOne(
    @Param('attributeId', ParseUUIDPipe) attributeId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.attributeValuesService.findOne(attributeId, id);
  }

  @Patch(':id')
  update(
    @Param('attributeId', ParseUUIDPipe) attributeId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    return this.attributeValuesService.update(
      attributeId,
      id,
      updateAttributeValueDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('attributeId', ParseUUIDPipe) attributeId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.attributeValuesService.remove(attributeId, id);
  }
}
