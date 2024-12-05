import { IsString, IsNotEmpty, IsBoolean, Length } from 'class-validator';

export class CreateCurrencyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @Length(3)
    @IsNotEmpty()
    code: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
