import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
