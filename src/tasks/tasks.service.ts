import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        userId,
      },
      include: { category: true },
    });
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!task || task.userId !== userId) {
      throw new NotFoundException('Tâche non trouvée');
    }

    return task;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto) {
    await this.findOne(userId, id);

    return this.prisma.task.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.task.delete({ where: { id } });

    return { message: 'Tâche supprimée avec succès' };
  }
}