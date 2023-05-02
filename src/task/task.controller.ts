import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    
    return await  this.taskService.create(createTaskDto);
  }

  // @Get()
  // findAll() {
  //   return this.taskService.findAll();
  // }
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id',new ParseUUIDPipe()) id: string) {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id',new ParseUUIDPipe()) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(+id);
  }
}
