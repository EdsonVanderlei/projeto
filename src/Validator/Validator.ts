import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import {cpf } from 'cpf-cnpj-validator'


@ValidatorConstraint({name:'cpf',async:false})
export class Validator implements ValidatorConstraintInterface{
        validate(cpfNumber:any){
             if(typeof cpfNumber === 'string')return  cpf.isValid(cpfNumber)
             return false
        }
        defaultMessage(){
            return "Cpf Inválido"
        }
}

