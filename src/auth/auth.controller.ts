/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto';
import { User } from '@prisma/client';
import { GetMe } from 'src/decorators/get-me';
import { JwtGuard } from 'src/guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() payload: AuthPayloadDto) {
    return this.authService.signin(payload);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetMe() user: User) {
    return user;
  }
}
