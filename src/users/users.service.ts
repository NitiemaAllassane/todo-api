import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

const userSelect = {
  id: true,
  fullname: true,
  phone: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}


  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        password: hashedPassword,
        fullname: createUserDto.fullname,
        phone: createUserDto.phone,
        email: createUserDto.email
      },
      select: userSelect
    })
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ 
      select: userSelect,
      orderBy: { createdAt: 'desc' }
    })
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect
    })

    if (!user) {
      throw new NotFoundException(`Utilisateur non trouvé`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email }, 
    });

    return user;
  }
  
  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      data,
      where: { id },
      select: userSelect
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await  this.prisma.user.delete({
      where: { id },
      select: userSelect,
    });

    return {
      message: "Compte supprimé avec succès"
    }
  }
}
