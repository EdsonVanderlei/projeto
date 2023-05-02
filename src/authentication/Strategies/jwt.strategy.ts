import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { Strategy,ExtractJwt } from "passport-jwt";
import { CryptoService } from "src/crypto/crypto.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly cryptoService: CryptoService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.SECRET_KEY

        })

     
    }
    async validate(payload:any){
        return {id:payload.sub,email:payload.email}
    }

}