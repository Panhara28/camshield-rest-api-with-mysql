/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsUrl,
  IsMimeType,
  MaxLength,
  Min,
} from 'class-validator';
import { MediaType, Visibility } from '@prisma/client';

export class CreateMediaDto {
  @IsString()
  filename: string;

  @IsString()
  storedFilename: string;

  @IsUrl()
  url: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsMimeType()
  mimetype: string;

  @IsString()
  extension: string;

  @IsInt()
  @Min(1)
  size: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  uploadedById: number;

  @IsOptional()
  @IsInt()
  width?: number;

  @IsOptional()
  @IsInt()
  height?: number;

  @IsOptional()
  @IsEnum(Visibility)
  visibility?: Visibility = Visibility.PUBLIC;
}
