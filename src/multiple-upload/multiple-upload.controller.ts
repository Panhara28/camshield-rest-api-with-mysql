import {
  Controller,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'; // <--- Use FilesInterceptor
import { JwtGuard } from 'src/guard';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';
import { MultipleUploadService } from './multiple-upload.service';

@Controller('upload')
export class MultipleUploadController {
  constructor(
    private readonly multipleMultipleSerivce: MultipleUploadService,
  ) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('multiple_upload')
  @Post('files') // <-- change endpoint
  @UseInterceptors(FilesInterceptor('files', 10)) // <-- 10 max files
  uploadFiles(
    @Body() params: { folder: string },
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const { folder } = params;
    return this.multipleMultipleSerivce.uploadFiles(folder, files);
  }
}
