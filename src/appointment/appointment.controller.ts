import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentDto } from './create-appoitment.dto';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getAppoitments() {
    return this.appointmentService.getAppoitments();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user-appointments')
  getUserAppoitments(@Request() { user }) {
    return this.appointmentService.getUserAppoitments(user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }
}
