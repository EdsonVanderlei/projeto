import { Injectable ,BadRequestException, HttpStatus, HttpException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {

  constructor(private prismaService: PrismaService){}

  async create(createTaskDto: CreateTaskDto) {
    const res = await this.prismaService.user.findFirst({where:{id:createTaskDto.userId}})
    if(res){
      return await this.prismaService.task.create({data:createTaskDto})
    }  
    throw new BadRequestException("Usuário não Encontrado !");
  }

  // async findAll() {
  //   return await this.prismaService.task.findMany();
  // }

  async findOne(id: string) {
    const res = await this.prismaService.task.findFirst({where: {id}})
    if(res){
      const {data,descricao,id,userId} = res
      return {
        data,
        descricao,
        id,
        userId
      }
    }
    throw new HttpException('Tarefa não encontrada !',HttpStatus.NOT_FOUND)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.prismaService.task.update({where:{id},data: updateTaskDto})

  }

  async remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
