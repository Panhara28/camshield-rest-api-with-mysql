import { Inject, Injectable } from '@nestjs/common';
import { S3MultipleUploadStrategy } from 'src/strategy/uploads/multiple-upload-digital-ocean';

@Injectable()
export class MultipleUploadService {
  constructor(
    @Inject('MultipleUploadStrategy')
    private strategy: S3MultipleUploadStrategy,
  ) {}

  async uploadFiles(
    folder: string,
    files: Express.Multer.File[],
  ): Promise<any[]> {
    if (!files || files.length === 0) throw new Error('No files uploaded');
    const uploads = files.map((file) => this.strategy.upload(folder, file));
    return Promise.all(uploads);
  }
}
