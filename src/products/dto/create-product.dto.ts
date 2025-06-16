import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
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

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

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
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  material: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  costPerItem?: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  sku: string;
}
