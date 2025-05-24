/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.set('truth proxy', 'loopback');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CamShield Api Documentation')
    .setDescription('The CamShield API')
    .setVersion('1.0')
    .addTag('camshield')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/document', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
