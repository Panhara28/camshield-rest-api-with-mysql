import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { LocalUploadStrategy, S3UploadStrategy } from 'src/strategy/uploads';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [
    {
      provide: 'UploadStrategy',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('STORAGE_DRIVER') === 's3'
          ? new S3UploadStrategy(config)
          : new LocalUploadStrategy();
      },
    },
    UploadService,
  ],
  exports: [UploadService],
})
export class UploadModule {}
