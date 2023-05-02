import { IsEmail,IsNotEmpty, Validate,  IsString, IsStrongPassword , MinLength } from "class-validator";
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