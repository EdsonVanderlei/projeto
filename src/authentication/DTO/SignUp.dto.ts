import { IsEmail,IsNotEmpty, Validate, IsNumber, IsString, IsStrongPassword, Length, MinLength } from "class-validator";
import { Validator } from "src/Validator/Validator";
export  class SignUpDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    nome: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    senha: string

    @IsString()
    @Validate(Validator)
    @IsNotEmpty()
    cpf: string

}