/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(payload: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: {
        title: payload.title,
        description: payload.description,
        categoryId: Number(payload.categoryId),
        type: payload.type || '',
        vendor: payload.vendor,
        price: payload.price ?? 0,
        compareAtPrice: payload.compareAtPrice,
        costPerItem: payload.costPerItem,
        variants: {
          create: payload.variants,
        },
      },
    });

    if (payload.mediaUrls?.length) {
      await this.prisma.mediaProductDetails.createMany({
        data: payload.mediaUrls.map((media) => ({
          url: media.url,
          productId: createdProduct.id,
        })),
      });
    }

    return createdProduct;
  }

  async getMediaByProduct(productId: number) {
    const media = await this.prisma.mediaProductDetails.findMany({
      where: { productId: Number(productId) },
    });

    return { data: media };
  }

  productList() {
    return this.prisma.product.findMany({
      include: { media: true, variants: true },
    });
  }

  async productDetail(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        MediaProductDetails: true,
      },
    });
  }

  async updateProduct(slug: string, data: UpdateProductDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Update base product fields
      const updatedProduct = await tx.product.update({
        where: { slug },
        data: {
          title: data.title,
          description: data.description,
          categoryId: Number(data.categoryId),
          type: data.type,
          vendor: data.vendor,
          price: data.price ?? 0,
          compareAtPrice: data.compareAtPrice,
          costPerItem: data.costPerItem,
        },
      });

      // 2. Handle Variants Smartly
      if (data.variants && data.variants.length > 0) {
        const existingVariants = await tx.variant.findMany({
          where: { productId: updatedProduct.id },
        });

        const incomingKeys = new Set(
          data.variants.map(
            (v) => `${v.size || ''}_${v.color || ''}_${v.material || ''}`,
          ),
        );

        const existingMap = new Map(
          existingVariants.map((v) => [
            `${v.size || ''}_${v.color || ''}_${v.material || ''}`,
            v,
          ]),
        );

        // 2a. Delete variants not in incoming
        const keysToKeep = Array.from(incomingKeys);
        await tx.variant.deleteMany({
          where: {
            productId: updatedProduct.id,
            NOT: {
              OR: keysToKeep.map((k) => {
                const [size, color, material] = k.split('_');
                return { size, color, material };
              }),
            },
          },
        });

        // 2b. Upsert variants (update if exists, create if not)
        for (const v of data.variants) {
          const key = `${v.size || ''}_${v.color || ''}_${v.material || ''}`;
          const existing = existingMap.get(key);

          if (existing) {
            await tx.variant.update({
              where: { id: existing.id },
              data: {
                ...v,
                size: v.size || '',
                color: v.color || '',
                material: v.material || '',
              },
            });
          } else {
            await tx.variant.create({
              data: {
                ...v,
                size: v.size || '',
                color: v.color || '',
                material: v.material || '',
                productId: updatedProduct.id,
              },
            });
          }
        }
      } else {
        // Optional: If no variants submitted, delete all
        await tx.variant.deleteMany({
          where: { productId: updatedProduct.id },
        });
      }

      // 3. Replace MediaProductDetails
      if (data.mediaUrls) {
        // 3a. Delete old media
        await tx.mediaProductDetails.deleteMany({
          where: { productId: updatedProduct.id },
        });

        // 3b. Insert new media if provided
        if (data.mediaUrls.length > 0) {
          await tx.mediaProductDetails.createMany({
            data: data.mediaUrls.map((media) => ({
              url: media.url,
              productId: updatedProduct.id,
            })),
          });
        }
      }

      return updatedProduct;
    });
  }
}
