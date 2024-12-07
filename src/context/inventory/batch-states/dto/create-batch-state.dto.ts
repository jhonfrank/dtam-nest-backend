import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateBatchStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
