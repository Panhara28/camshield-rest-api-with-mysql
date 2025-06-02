/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { MediaService } from 'src/media/media.service';
import { S3MultipleUploadStrategy } from 'src/strategy/uploads/multiple-upload-digital-ocean';
import * as sharp from 'sharp';
import { CreateMediaDto } from 'src/media/dto/create-media.dto';

@Injectable()
export class MultipleUploadService {
  constructor(
    @Inject('MultipleUploadStrategy')
    private strategy: S3MultipleUploadStrategy,
    private mediaService: MediaService,
  ) {}

  async uploadFiles(
    folder: string,
    files: Express.Multer.File[],
  ): Promise<any[]> {
    if (!files || files.length === 0) throw new Error('No files uploaded');

    const uploads = await Promise.all(
      files.map(async (file) => {
        const uploadResult = await this.strategy.upload(folder, file);

        let width: number | null = null;
        let height: number | null = null;

        if (file.mimetype.startsWith('image/')) {
          try {
            const metadata = await sharp(file.buffer).metadata();
            width = metadata.width || null;
            height = metadata.height || null;
          } catch (err) {
            console.warn('Failed to get image dimensions', err);
          }
        }

        const mediaPayload: CreateMediaDto = {
          filename: uploadResult.originalName,
          storedFilename: uploadResult.filename,
          url: uploadResult.url,
          type: file.mimetype.split('/')[0].toString().toUpperCase() as any,
          mimetype: file.mimetype,
          extension: file.originalname.split('.').pop() || '',
          size: file.size,
          title: uploadResult.originalName,
          altText: '',
          description: '',
          uploadedById: 1,
          width: width ?? undefined,
          height: height ?? undefined,
          visibility: 'PUBLIC',
        };

        const result = await this.mediaService.createMedia(mediaPayload);
        return result?.data || result;
      }),
    );

    return uploads;
  }
}
