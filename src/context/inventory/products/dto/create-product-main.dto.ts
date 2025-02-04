import { Transform } from 'class-transformer';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import Decimal from 'decimal.js';

import { IsDecimaljs } from 'src/context/common/validators/is-decimaljs.decorator';
import { MaxDecimaljsPlaces } from 'src/context/common/validators/max-decimaljs-places.decorator';

export class CreateProductMainDto {
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @IsDecimaljs()
  @MaxDecimaljsPlaces(4)
  @IsNotEmpty()
  quantity: Decimal;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
