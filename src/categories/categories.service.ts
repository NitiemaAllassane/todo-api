import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCategoryDto) {
    const existing = await this.findByName(userId, dto.name);
    if (existing) {
      throw new ConflictException('Cette catégorie existe déjà');
    }

    return this.prisma.category.create({
      data: { ...dto, userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category || category.userId !== userId) {
      throw new NotFoundException('Catégorie non trouvée');
    }

    return category;
  }

  async findByName(userId: string, name: string) {
    return this.prisma.category.findFirst({
      where: { userId, name },
    });
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto) {
    await this.findOne(userId, id);

    if (dto.name) {
      const existing = await this.findByName(userId, dto.name);
      if (existing && existing.id !== id) {
        throw new ConflictException('Cette catégorie existe déjà');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.category.delete({ where: { id } });

    return { message: 'Catégorie supprimée avec succès' };
  }
}