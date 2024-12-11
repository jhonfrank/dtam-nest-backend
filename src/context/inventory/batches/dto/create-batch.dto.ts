import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import Decimal from 'decimal.js';
import { IsDecimaljs } from 'src/context/shared/validators/is-decimaljs.decorator';
import { MaxDecimaljsPlaces } from 'src/context/shared/validators/max-decimaljs-places.decorator';

export class CreateBatchDto {
  @Transform(({ value }) => new Decimal(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  @IsDecimaljs()
  @MaxDecimaljsPlaces(4)
  @IsNotEmpty()
  quantity: Decimal;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  batchStateId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
