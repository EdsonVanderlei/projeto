import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe,UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/CreateUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {AuthGuard} from '@nestjs/passport'
import { UpdateUserDTO } from './dto/UpdateUser.dto';

// http://localhost:3000/user/23
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
  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id',new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
