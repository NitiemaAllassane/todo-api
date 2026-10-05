// schedules/dto/create-schedule.dto.ts
import { IsString, IsNotEmpty, Matches, MaxLength, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "L'heure doit être au format HH:MM (ex: 09:00)",
  })
  time: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  tag?: string;
}