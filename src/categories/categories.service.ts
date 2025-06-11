/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategoryTree(parentId: string | null = null): Promise<any[]> {
    const categories = await this.prisma.category.findMany({
      where: { parentId },
      orderBy: { name: 'asc' },
    });

    const result = await Promise.all(
      categories.map(async (category) => ({
        ...category,
        children: await this.getCategoryTree(category.id),
      })),
    );

    return result;
  }
}
