import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service.js';
import { SchedulesController } from './schedules.controller.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService],
  imports: [PassportModule.register({
    defaultStrategy: 'jwt'
  })]
})
export class SchedulesModule {}
