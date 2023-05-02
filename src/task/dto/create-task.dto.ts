import { IsDateString, IsISO8601, IsString, IsUUID, MinLength } from "class-validator"

export class CreateTaskDto {

    @IsString()
    @MinLength(10)
    descricao: string

    @IsISO8601()
    data: string




    @IsUUID()
    userId: string

}
