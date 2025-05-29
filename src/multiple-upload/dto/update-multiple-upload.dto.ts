import { PartialType } from '@nestjs/swagger';
import { CreateMultipleUploadDto } from './create-multiple-upload.dto';

export class UpdateMultipleUploadDto extends PartialType(CreateMultipleUploadDto) {}
