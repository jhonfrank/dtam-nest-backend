import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @Length(14)
  @IsNotEmpty()
  sku: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
