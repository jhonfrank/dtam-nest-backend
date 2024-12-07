import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateBatchDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

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
