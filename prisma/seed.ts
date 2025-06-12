/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuidv4 } from 'uuid';

import { Category, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const DUMMY_PASSWORD =
  '$argon2id$v=19$m=65536,t=3,p=4$oTfBlJjwFXLyr8hj8I8LrQ$7vd6LYWLfrzgXSaWiuwXFMkrH6O9t0Jlw+/f4WwyIlQ';

async function main() {
  // Create 3 top-level categories
  const parentCategories: Category[] = [];

  for (let i = 0; i < 3; i++) {
    const parent: Category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });

    parentCategories.push(parent);
  }

  // Create 2 subcategories for each parent
  for (const parent of parentCategories) {
    for (let i = 0; i < 2; i++) {
      await prisma.category.create({
        data: {
          name:
            faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
          parentId: parent.id,
        },
      });
    }
  }

  // Seed permissions based on image
  const permissionNames = [
    'list_user',
    'view_user',
    'edit_user',
    'remove_user',
    'create_user',
    'detail_user',
    'profile_upload_user',
    'list_role',
    'multiple_upload',
    'create_media',
    'list_media',
    'create_product',
    'category_list',
    'product_detail',
  ];

  const permissions = await Promise.all(
    permissionNames.map((name) =>
      prisma.permission.upsert({
        where: { name },
        update: {},
        create: {
          name,
          slug: faker.string.uuid(),
        },
      }),
    ),
  );

  // Create Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      slug: 'admin',
      permissions: {
        create: permissions.map((p) => ({
          permissionId: p.id,
          slug: faker.string.uuid(),
        })),
      },
    },
  });

  // Create 50 users
  const users = await Promise.all(
    Array.from({ length: 50 }).map(() => {
      return prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: DUMMY_PASSWORD,
          roleId: adminRole.id,
          slug: faker.string.uuid(),
          profilePicture: faker.image.avatar(),
        },
      });
    }),
  );

  // Create 10 products each with 2 variants and 1 media
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        description: { text: faker.commerce.productDescription() },
        type: faker.commerce.productMaterial(),
        vendor: faker.company.name(),
        price: Number(faker.commerce.price()),
        compareAtPrice: Number(faker.commerce.price()),
        costPerItem: Number(faker.commerce.price()),
        slug: faker.string.uuid(),
        categoryId: 1,
      },
    });

    await prisma.variant.createMany({
      data: [
        {
          productId: product.id,
          size: 'M',
          color: 'Red',
          price: 99.99,
          compareAtPrice: 129.99,
          costPerItem: 49.99,
          stock: 10,
          sku: faker.string.alphanumeric(8),
          imageVariant: '',
          slug: faker.string.uuid(),
        },
        {
          productId: product.id,
          size: 'L',
          color: 'Blue',
          price: 109.99,
          compareAtPrice: 139.99,
          costPerItem: 59.99,
          stock: 15,
          sku: faker.string.alphanumeric(8),
          imageVariant: '',
          slug: faker.string.uuid(),
        },
      ],
    });

    await prisma.media.create({
      data: {
        filename: 'product.jpg',
        storedFilename: `${uuidv4()}.jpg`,
        url: faker.image.url(),
        type: 'IMAGE',
        mimetype: 'image/jpeg',
        extension: 'jpg',
        size: 200000,
        title: 'Product Image',
        uploadedById: users[Math.floor(Math.random() * users.length)].id,
        altText: 'Product image alt text',
        description: 'This is a test image for product.',
        width: 800,
        height: 600,
        visibility: 'PUBLIC',
        productId: product.id,
        slug: faker.string.uuid(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
