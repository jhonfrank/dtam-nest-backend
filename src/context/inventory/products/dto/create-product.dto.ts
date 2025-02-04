import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';
import Decimal from 'decimal.js';

import { IsDecimaljs } from 'src/context/common/validators/is-decimaljs.decorator';
import { MaxDecimaljsPlaces } from 'src/context/common/validators/max-decimaljs-places.decorator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @IsDecimaljs()
  @MaxDecimaljsPlaces(4)
  @IsNotEmpty()
  quantity: Decimal;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @IsUUID()
  @IsNotEmpty()
  unitId: string;
}
