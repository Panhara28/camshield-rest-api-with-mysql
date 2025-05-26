/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { JwtGuard } from 'src/guard';
import { DynamicUploadInterceptor } from 'src/interceptors/upload/upload.interceptor';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('profile_upload_user')
  @Post('file')
  @UseInterceptors(DynamicUploadInterceptor('file'))
  uploadFile(
    @Body() params: { folder: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { folder } = params;
    return this.uploadService.uploadFile(folder, file);
  }
}
