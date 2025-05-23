import { Controller, Get } from '@nestjs/common';

@Controller('')
export class UsersController {
  @Get('users')
  getAllUsers() {
    return 'Get All Users';
  }
}
