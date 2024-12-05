import { IsString, IsNotEmpty, IsBoolean, Length } from 'class-validator';

export class CreateUnitDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @Length(2)
    @IsNotEmpty()
    code: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
