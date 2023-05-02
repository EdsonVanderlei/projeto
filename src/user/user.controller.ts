import { Controller, Get, Post, Body, Patch, Delete,UseGuards, HttpStatus, HttpCode, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {AuthGuard} from '@nestjs/passport'
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private prismaService: PrismaService) { }



  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('findUser')
  findOne(@Req() req:any) {
    return this.userService.findOne(req.user.id);
  }

  @Patch('')
  update(@Req() req:any,@Body() updateUserDto:UpdateUserDTO) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Delete('')
  remove(@Req() req:any) {
    return this.userService.remove(req.user.id);
  }
}
