import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
