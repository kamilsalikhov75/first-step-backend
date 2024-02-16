import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getUserByEmail(@Param() param) {
    return this.userService.getUserByEmail(param.email);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@UserId() id: string) {
    return this.userService.getUserById(id);
  }
  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
