import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserPayloadDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(payload: UserPayloadDto) {
    const { email, name, password, roleId } = payload;

    const hashPassword = await argon.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: hashPassword,
          roleId: Number(roleId),
        },
      });

      if (!user) {
        throw new ForbiddenException(`User can't create!`);
      } else {
        return {
          success: true,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User is already existed');
        }
      }
    }
  }
}
