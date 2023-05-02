import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './authentication/Auth.module';
import { ConfigModule} from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [UserModule, TaskModule, AuthModule,ConfigModule.forRoot(), PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
