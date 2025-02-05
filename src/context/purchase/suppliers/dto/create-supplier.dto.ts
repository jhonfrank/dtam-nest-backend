import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  legalName: string;

  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  locationCode: string;

  @IsUrl()
  @IsNotEmpty()
  websiteUrl: string;

  @IsUrl()
  @IsNotEmpty()
  remarks: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsUUID()
  @IsNotEmpty()
  documentTypeId;
}
