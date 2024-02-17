import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './create-appoitment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async getAppoitmentByDate(date: string) {
    return this.appointmentModel
      .findOne({
        date,
      })
      .exec();
  }

  async getAppoitments() {
    return this.appointmentModel.find().populate('user');
  }

  async getUserAppoitments(userId: string) {
    return this.appointmentModel.find({ user: userId });
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const createAppointment = new this.appointmentModel(createAppointmentDto);

    const appointment = await this.getAppoitmentByDate(
      createAppointment.date.toString(),
    );

    if (appointment) {
      throw new BadRequestException(
        'На эту дату уже есть запись. Попробуйте другое время или дату',
      );
    }

    await createAppointment.save();
  }
}
