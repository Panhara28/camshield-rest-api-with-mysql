import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
