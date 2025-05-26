/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, Inject } from '@nestjs/common';
import { UploadStrategy } from 'src/interfaces/uploads/upload-interfaces';

@Injectable()
export class UploadService {
  constructor(@Inject('UploadStrategy') private strategy: UploadStrategy) {}

  uploadFile(folder: string, file: Express.Multer.File): Promise<any> {
    if (!file) throw new Error('File not found');
    return this.strategy.upload(folder, file);
  }
}
