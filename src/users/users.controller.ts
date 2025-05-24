import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserPayloadDto } from './dto';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('create_user')
  @Post('create')
  createUser(@Body() payload: UserPayloadDto) {
    return this.usersService.createUser(payload);
  }
}
