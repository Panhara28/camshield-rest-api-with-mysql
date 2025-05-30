/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { QueryingMediaInterface } from 'src/interfaces/media/media-interface';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async createMedia(dto: CreateMediaDto | CreateMediaDto[]) {
    try {
      // Handle array of media creation

      if (Array.isArray(dto)) {
        const media = await this.prisma.media.createMany({
          data: dto,
        });
        if (!media || media.count === 0) {
          throw new ForbiddenException(`No media items were created.`);
        }
        return {
          success: true,
          count: media.count,
        };
      }

      // Handle single media creation
      const media = await this.prisma.media.create({
        data: dto,
      });
      if (!media) {
        throw new ForbiddenException(`User can't create!`);
      }

      return {
        success: true,
        data: media,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `Media cannot be processed due to a unique constraint.`,
          );
        }
      }
      throw error;
    }
  }

  async mediaList({ filter, pagination }: QueryingMediaInterface) {
    const { limit = 10, page = 1 } = pagination;
    const {
      filename,
      extension,
      createdAt,
      mimetype,
      type,
      uploadedById,
      visibility,
    } = filter;

    const where: any = {};

    if (filename) {
      where.filename = { contains: filename };
    }

    if (extension) {
      where.extension = { contains: extension };
    }

    if (createdAt) {
      where.createdAt = { contains: createdAt };
    }

    if (mimetype) {
      where.mimetype = { contains: mimetype };
    }

    if (type) {
      where.type = { contains: type };
    }

    if (uploadedById) {
      where.uploadedByid = { contains: uploadedById };
    }

    if (visibility) {
      where.visibility = { contains: visibility };
    }
    const [medias, total] = await this.prisma.$transaction([
      this.prisma.media.findMany({
        where,
        skip: (Number(page) - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      data: medias,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
