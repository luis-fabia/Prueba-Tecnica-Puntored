import { IsString, IsNotEmpty, IsNumber, IsNumberString, Length, Min, Max, Matches } from "class-validator"

export class Buydto {
    @IsString()
    @IsNotEmpty()
    supplierId: string

    @IsNumberString()
    @IsNotEmpty()
    @Length(10, 10)
    @Matches(/^3\d{9}$/)
    cellPhone: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1000)
    @Max(100000)
    value: number
} 