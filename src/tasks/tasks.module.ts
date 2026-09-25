import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}