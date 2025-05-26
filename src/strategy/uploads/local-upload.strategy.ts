import { Injectable } from '@nestjs/common';
import { UploadStrategy } from 'src/interfaces/uploads/upload-interfaces';

@Injectable()
export class LocalUploadStrategy implements UploadStrategy {
  upload(folder: string, file: Express.Multer.File) {
    const fileUrl = `/uploads/${folder}/${file.filename}`;
    return {
      storage: 'local',
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: fileUrl,
    };
  }
}
