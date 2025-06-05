import { MediaType, Visibility } from '@prisma/client';

export class MediaResponseDto {
  id: string;
  filename: string;
  storedFilename: string;
  url: string;
  type: MediaType;
  mimetype: string;
  extension: string;
  size: number;
  title?: string;
  altText?: string;
  description?: string;
  uploadedById: number;
  uploadedAt: Date;
  width?: number;
  height?: number;
  visibility: Visibility;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  productId: any[];
}
