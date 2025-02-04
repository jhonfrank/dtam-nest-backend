import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { CreateProductMainDto } from '../dto/create-product-main.dto';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { ProductVariationsService } from '../services/product-variations.service';

@Controller('products/:productId/variations')
export class ProductVariationsController {
  constructor(
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  @Post('main')
  createMain(
    @Query('type') type: string,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body()
    createProductMainDto: CreateProductMainDto,
  ) {
    return this.productVariationsService.createMain(
      productId,
      createProductMainDto,
    );
  }

  @Post('variant')
  createVariant(
    @Query('type') type: string,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body()
    createProductVariantDto: CreateProductVariantDto,
  ) {
    if (!('attributes' in createProductVariantDto)) {
      throw new BadRequestException(
        `The body does not contain the list of attributes`,
      );
    }

    return this.productVariationsService.createVariant(
      productId,
      createProductVariantDto,
    );
  }

  @Get()
  findAll(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productVariationsService.findAll(productId);
  }

  @Get(':id')
  findOne(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productVariationsService.findOne(productId, id);
  }

  /*
  @Patch(':id')
  update(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductVariationDto,
  ) {
    return this.productVariationsService.update(
      productId,
      id,
      updateProductDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productVariationsService.remove(productId, id);
  }
  */
}
