import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  @IsNotEmpty()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
