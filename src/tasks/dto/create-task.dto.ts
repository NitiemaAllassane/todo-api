import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../../generated/prisma/enums.js';


export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status doit être l'une des valeurs suivantes : ${Object.values(TaskStatus).join(', ')}`,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority, {
    message: `priority doit être l'une des valeurs suivantes : ${Object.values(TaskPriority).join(', ')}`,
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}