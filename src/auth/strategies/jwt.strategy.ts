// auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { UsersService } from '../../users/users.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({ 
            jwtFromRequest: (req: Request) => {
                return req?.cookies?.access_token || null;
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string
        })
    }

    async validate(payload: { sub: string, email: string }) {
        const user = await this.userService.findByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('Utilisateur introuvable');
        }

        return {
            userId: user.id,
            email: user.email,
            fullname: user.fullname
        }
    }
}