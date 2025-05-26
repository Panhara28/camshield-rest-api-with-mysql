/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserPayloadDto, UserPayloadDto } from './dto';
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

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('list_user')
  @Get('lists')
  userList(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('email') email?: string,
    @Query('name') name?: string,
    @Query('roleId') roleId?: number,
  ) {
    return this.usersService.userList({
      filter: { email, name, roleId },
      pagination: {
        limit,
        page,
      },
    });
  }

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('detail_user')
  @Get(':slug')
  userDetail(@Param() params: { slug: string }) {
    const { slug } = params;
    return this.usersService.userDetail({ slug });
  }

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('edit_user')
  @Patch('/:slug/edit')
  updateUser(
    @Body() payload: UpdateUserPayloadDto,
    @Param() params: { slug: string },
  ) {
    const { slug } = params;

    return this.usersService.updateUser(payload, { slug });
  }
}
