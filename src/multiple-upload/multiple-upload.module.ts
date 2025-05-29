import { Module } from '@nestjs/common';
import { MultipleUploadService } from './multiple-upload.service';
import { MultipleUploadController } from './multiple-upload.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  LocalUploadStrategy,
  S3MultipleUploadStrategy,
} from 'src/strategy/uploads';

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
  ],
  exports: [MultipleUploadService],
})
export class MultipleUploadModule {}
