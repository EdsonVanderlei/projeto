import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    exports:[PrismaService],
    providers: [PrismaService],
    imports:[],
    controllers:[]
})
export class PrismaModule {}
