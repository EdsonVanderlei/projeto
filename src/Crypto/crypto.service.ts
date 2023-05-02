import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()
export class CryptoService {

    private algorithm = 'aes-256-cbc'
    private cryptoKey = process.env.SECRET_CRYPTO_KEY
    private iv = crypto.randomBytes(16)

    constructor() {}

     Crypto(text: string) {
        const cipher = crypto.createCipheriv(this.algorithm, this.cryptoKey, this.iv);
        let encrypted = cipher.update(text, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

     Decrypt(text: string) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.cryptoKey, this.iv);
        let decrypted = decipher.update(text, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
