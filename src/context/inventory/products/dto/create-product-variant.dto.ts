import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import Decimal from 'decimal.js';

import { IsDecimaljs } from 'src/context/shared/validators/is-decimaljs.decorator';
import { MaxDecimaljsPlaces } from 'src/context/shared/validators/max-decimaljs-places.decorator';

export class CreateProductVariantDto {
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @IsDecimaljs()
  @MaxDecimaljsPlaces(4)
  @IsNotEmpty()
  quantity: Decimal;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  attributes: AttributeDto[];
}

class AttributeDto {
  @IsUUID()
  @IsNotEmpty()
  attributeId: string;

  @IsUUID()
  @IsNotEmpty()
  attributeValueId: string;
}
