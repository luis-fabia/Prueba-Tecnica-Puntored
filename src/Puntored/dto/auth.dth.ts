import { IsString, IsNotEmpty } from 'class-validator';

export class  AuthDto {
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}