import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './Auth.service';
import { User } from '@prisma/client';
import { SignUpDTO } from './DTO/SignUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Req() req:any){

    const user: User = req.user
    
    return  await this.authService.login(user)
   
  }

  @Post('signup')
  async SignUp(@Body() SignUp: SignUpDTO){
    return await this.authService.SignUp(SignUp)
  }

}
