import { BadRequestException,Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { SignUpDTO } from './DTO/SignUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
    constructor(private readonly cryptoService: CryptoService,private readonly userService: UserService, private readonly jwtService: JwtService, private readonly prismaService:PrismaService) { }

    async login(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role }
        const token = await this.jwtService.signAsync(payload)
        //  const encrypted =  this.cryptoService.Crypto(token)
        let userClone = { ...user }
        delete userClone.senha
        return {
            token: token,
            user: userClone
        }
    }

    async validateUser(email: string, password: string) {
        console.log(email)
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const IsPassword = await bcrypt.compare(password, user.senha)
        if (!IsPassword) return null;

        return user

    }


    async SignUp(createUserDto: SignUpDTO) {
        const { senha } = createUserDto
        const user = await this.prismaService.user.findMany({ where: { OR: [{ email: createUserDto.email }, { cpf: createUserDto.cpf }] } })
        if (user.length > 0) {
            throw new BadRequestException('E-mail ou CPF já cadastrados !')
        }
        createUserDto.senha = await bcrypt.hash(senha, 10)
        await this.prismaService.user.create({ data: createUserDto })
        return {
            Message: 'Usuário Criado !'
        }
    }
}
