import { Body, Controller, Post } from '@nestjs/common';
import { UserPayloadDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create')
  createUser(@Body() payload: UserPayloadDto) {
    return this.usersService.createUser(payload);
  }
}
