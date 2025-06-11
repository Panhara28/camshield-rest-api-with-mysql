import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { MediaResponseDto } from 'src/media/dto/media-response.dto';
// import { MediaResponseDto } from 'src/media/dto/media-response.dto';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @Type(() => MediaResponseDto)
  mediaUrls: MediaResponseDto[];

  @IsString()
  @IsOptional()
  categoryId: string;

  @IsString()
  type: string;

  @IsString()
  vendor: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costPerItem?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}

export class VariantDto {
  @IsString()
  imageVariant: string;

  @IsString()
  size: string;

  @IsString()
  color: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costPerItem?: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  sku: string;
}
