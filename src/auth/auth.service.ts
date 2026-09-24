import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/registerDto.js';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/loginDto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // injection de depandanc
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    // * Logique d'inscription
    async register(registerDto: RegisterDto) {
        const existingEmail = await this.userService.findByEmail(registerDto.email);
        if (existingEmail) throw new ConflictException(`L'email ${registerDto.email} est déjà utilisé`);

        const existingPhone = await this.userService.findByPhone(registerDto.phone);
        if (existingPhone) throw new ConflictException(`Le numéro ${registerDto.phone} est déjà utilisé`);


        return this.userService.create(registerDto)
    }

    // *Logique de connexion
    async login(loginDto: LoginDto) {
        const errorMessage = `Identifiants invalides`;

        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) throw new UnauthorizedException(errorMessage);

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException(errorMessage);

        const payload = { sub: user.id , email: user.email }
        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token
        }
    }
}
