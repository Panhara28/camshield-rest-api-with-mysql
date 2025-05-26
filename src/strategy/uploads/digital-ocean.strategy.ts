/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { UploadStrategy } from 'src/interfaces/uploads/upload-interfaces';

@Injectable()
export class S3UploadStrategy implements UploadStrategy {
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get<string>('SPACES_REGION', 'sgp1')!,
      endpoint: this.config.get<string>('SPACES_ENDPOINT')!,
      credentials: {
        accessKeyId: this.config.get<string>('SPACES_KEY')!,
        secretAccessKey: this.config.get<string>('SPACES_SECRET')!,
      },
    });

    this.bucket = this.config.get<string>('SPACES_BUCKET')!;
  }

  async upload(folder: string, file: Express.Multer.File) {
    const ext = extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const key = `${folder}/${filename}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await this.s3.send(command);

    return {
      storage: 'spaces',
      filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `https://${this.config.get('SPACES_BUCKET')}.${this.config.get('SPACES_REGION')}.${this.config.get('SPACES_CDN')}/${key}`,
    };
  }
}
