import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service.js';
import { CreateScheduleDto } from './dto/create-schedule.dto.js';
import { UpdateScheduleDto } from './dto/update-schedule.dto.js';
import type { AuthenticatedRequest } from '../types/index.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest ,@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create( req.user.userId ,createScheduleDto);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.schedulesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.schedulesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Req() req: AuthenticatedRequest,
    @Body() updateScheduleDto: UpdateScheduleDto
  ) {
    return this.schedulesService.update(id,req.user.userId, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.schedulesService.remove(id, req.user.userId);
  }
}
