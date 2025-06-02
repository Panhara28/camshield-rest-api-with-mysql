import { Module } from '@nestjs/common';
import { MultipleUploadService } from './multiple-upload.service';
import { MultipleUploadController } from './multiple-upload.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  LocalUploadStrategy,
  S3MultipleUploadStrategy,
} from 'src/strategy/uploads';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [ConfigModule],
  controllers: [MultipleUploadController],
  providers: [
    {
      provide: 'MultipleUploadStrategy',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('STORAGE_DRIVER') === 's3'
          ? new S3MultipleUploadStrategy(config)
          : new LocalUploadStrategy();
      },
    },
    MultipleUploadService,
    MediaService,
  ],
  exports: [MultipleUploadService],
})
export class MultipleUploadModule {}
