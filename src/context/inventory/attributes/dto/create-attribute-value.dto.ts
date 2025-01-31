import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAttributeValueDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
