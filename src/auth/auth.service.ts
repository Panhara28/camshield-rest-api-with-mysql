import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signin(payload: AuthPayloadDto) {
    const { email, password } = payload;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException(`User does not exist`);

    const passwordMatch = await argon.verify(user.password, password);

    if (!passwordMatch) throw new ForbiddenException(`Password is incorrect`);

    return this.getToken(user.id, user.email);
  }

  async getToken(userId: number, email: string): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret: string | undefined = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '90d',
      secret,
    });

    return { token };
  }
}
