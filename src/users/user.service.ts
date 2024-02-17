import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { Role, User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    const user = await this.getUserByEmail(createUser.email);
    if (user) {
      throw new BadRequestException('Электронная почта уже используется');
    }

    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );

    createUser.role = Role.User;

    await createUser.save();

    const payload = {
      id: createUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
