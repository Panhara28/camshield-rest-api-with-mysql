import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserPayloadDto } from './dto';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createUser(@Body() payload: UserPayloadDto) {
    return this.usersService.createUser(payload);
  }
}
