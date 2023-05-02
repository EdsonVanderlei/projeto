import { HttpException, HttpStatus, BadRequestException, Injectable } from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { UpdateUserDTO } from './dto/UpdateUser.dto';
@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }



  async findAll() {
    return await this.prismaService.user.findMany({
      select: {
        nome: true,
        cpf: true,
        id: true,
        email:true,
        senha: true,
        Tasks: {
          select: {
            data: true,
            id: true,
            descricao: true
          }
        }
      },

    },

    );
  }

  async findByEmail(Email:string){
      const res = await this.prismaService.user.findFirst({where:{email:Email}})
      return  res ? res : null
  }

  async findOne(id: string) {
    const res = await this.prismaService.user.findFirst({ where: { id } })
    if (res) return res
    throw new BadRequestException('Nenhum usuário Encontrado !')
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    return await this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({ where: { id } })
  }
}
