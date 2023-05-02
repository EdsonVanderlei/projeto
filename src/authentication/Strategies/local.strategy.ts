import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from "../Auth.service";
import { LoginUserDTO } from "../DTO/LoginUser.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email:string, password:string) {
        const user = await this.authService.validateUser(email, password);

        if(!user) throw new UnauthorizedException(user)

        return user;
    }
} 