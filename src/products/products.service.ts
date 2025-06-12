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

  async update(id: number, data: UpdateProductDto) {
    return this.prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          categoryId: Number(data.categoryId),
          type: data.type,
          vendor: data.vendor,
          price: data.price,
          compareAtPrice: data.compareAtPrice,
          costPerItem: data.costPerItem,
        },
      });

      // if (data.mediaUrls) {
      //   await tx.media.deleteMany({ where: { productId: id } });
      //   await tx.media.createMany({
      //     data: data.mediaUrls,
      //   });
      // }

      if (data.variants) {
        await tx.variant.deleteMany({ where: { productId: id } });
        await tx.variant.createMany({
          data: data.variants.map((v) => ({ ...v, productId: id })),
        });
      }

      return updatedProduct;
    });
  }
}
