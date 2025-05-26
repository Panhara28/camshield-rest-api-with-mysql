/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  mixin,
  Type,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export function DynamicUploadInterceptor(
  fieldName = 'file',
): Type<NestInterceptor> {
  const isS3 = process.env.STORAGE_DRIVER === 's3';

  const storage = isS3
    ? memoryStorage()
    : diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      });

  const InterceptorClass = FileInterceptor(fieldName, {
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
      const allowed = ['image/png', 'image/jpeg', 'application/pdf'];
      allowed.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error('Invalid file type'), false);
    },
  });

  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    private readonly instance = new InterceptorClass();

    intercept(context: ExecutionContext, next: CallHandler) {
      return this.instance.intercept(context, next);
    }
  }

  return mixin(MixinInterceptor);
}
