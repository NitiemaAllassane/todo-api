import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto.js';
import { UpdateScheduleDto } from './dto/update-schedule.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  
  async create(userId: string ,createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: {
       ...createScheduleDto,
       userId
      }
    })
  }

  async findAll(userId: string) {
    return this.prisma.schedule.findMany({ 
      where: { userId },
      orderBy: { time: "asc" }
    });
  }

  async findOne(id: string, userId: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
    });

    if (!schedule || schedule.userId !== userId) {
      throw new NotFoundException("Ce programme n'existe pas");
    }

    return schedule;
  }

  async update(id: string, userId: string, updateScheduleDto: UpdateScheduleDto) {
    await this.findOne(id, userId);
    const data = {...updateScheduleDto};

    return this.prisma.schedule.update({
      data,
      where: { id }
    })
  }

  async remove(id: string, userId: string) {
   await this.findOne(id, userId);

   await this.prisma.schedule.delete({
    where: { id }
   });

   return {
    message: "Planning supprimé avec succes !"
   }
  }
}
