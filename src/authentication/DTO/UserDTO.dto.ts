import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator"


export class UserDTO {
    
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsString()
    nome: string

    @IsNotEmpty()
    @IsString()
    role: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    senha: string

    @IsNotEmpty()
    @IsString()
    cpf: string

    @IsNotEmpty()
    @IsString()
    createAt: string

    @IsNotEmpty()
    @IsString()
    updateAt: string
}