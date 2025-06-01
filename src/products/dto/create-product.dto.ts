import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
// import { MediaResponseDto } from 'src/media/dto/media-response.dto';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  //   @IsArray()
  //   @ValidateNested({ each: true })
  //   @Type(() => MediaResponseDto)
  //   mediaUrls: MediaResponseDto[];

  @IsString()
  category: string;

  @IsString()
  type: string;

  @IsString()
  vendor: string;

  @IsOptional()
  @IsBoolean()
  chargeTax?: boolean;

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

  @IsOptional()
  @IsBoolean()
  chargeTax?: boolean;

  @IsOptional()
  @IsBoolean()
  continueSellingOOS?: boolean;

  @IsOptional()
  @IsBoolean()
  trackQuantity?: boolean;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode?: string;
}
