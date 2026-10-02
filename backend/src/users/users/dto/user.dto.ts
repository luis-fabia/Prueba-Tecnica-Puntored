import {  IsNotEmpty, IsString } from "class-validator";

export class userdto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string
}