/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { JwtGuard } from 'src/guard';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('create_media')
  @Post('create')
  createMedia(@Body() payload: CreateMediaDto | CreateMediaDto[]) {
    return this.mediaService.createMedia(payload);
  }

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('list_media')
  @Get('lists')
  medialist(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('filename') filename?: string,
    @Query('extension') extension?: string,
    @Query('createdAt') createdAt?: string,
    @Query('mimetype') mimetype?: string,
    @Query('type') type?: string,
    @Query('uploadedById') uploadedById?: number,
    @Query('visibility') visibility?: string,
  ) {
    return this.mediaService.mediaList({
      filter: {
        createdAt,
        extension,
        filename,
        mimetype,
        type,
        uploadedById,
        visibility,
      },
      pagination: {
        limit,
        page,
      },
    });
  }
}
