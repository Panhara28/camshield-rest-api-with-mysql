/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateUserPayloadDto, UserPayloadDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { UserInterface } from 'src/interfaces/users/user-interfaces';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';

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
          slug: uuidv4(),
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

  async userList({ filter, pagination }: UserInterface) {
    const { limit = 10, page = 1 } = pagination;
    const { email, name, roleId } = filter;

    const where: any = {};

    if (email) {
      where.email = { contains: email };
    }

    if (name) {
      where.name = { contains: name };
    }

    if (roleId) {
      where.roleId = roleId;
    }

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          role: true,
        },
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const sanitizedUsers = users.map(({ password, ...rest }) => rest);

    return {
      data: sanitizedUsers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async userDetail(params: { slug: string }) {
    const { slug } = params;
    const user = await this.prisma.user.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return user;
  }

  async updateUser(payload: UpdateUserPayloadDto, params: { slug: string }) {
    const { slug } = params;

    const existingUser = await this.prisma.user.findUnique({ where: { slug } });

    if (!existingUser) {
      throw new ForbiddenException(`User not found`);
    }

    const updateUser = await this.prisma.user.update({
      where: {
        slug,
      },
      data: payload,
      omit: {
        password: true,
      },
    });

    if (!updateUser) {
      throw new ForbiddenException(`User not update succesfully`);
    }
    return {
      message: 'Update Successfully',
    };
  }
}
