import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TasksModule } from './tasks/tasks.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { SchedulesModule } from './schedules/schedules.module.js';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TasksModule, CategoriesModule, SchedulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
