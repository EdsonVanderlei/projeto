import {  BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }



  async findAll() {
    return await this.prismaService.user.findMany({ include: { Tasks: true } });
  }

  async findByEmail(Email: string) {
    const res = await this.prismaService.user.findFirst({ where: { email: Email } })
    return res ? res : null
  }

  async findOne(id: string) {
    const res = await this.prismaService.user.findFirst({ where: { id } })
    if (res) {
      delete res.senha
      return res
    }
    throw new BadRequestException('Nenhum usuário Encontrado !')
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    return await this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({ where: { id } })
  }
}
