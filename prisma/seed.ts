/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuidv4 } from 'uuid';

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const DUMMY_PASSWORD =
  '$argon2id$v=19$m=65536,t=3,p=4$oTfBlJjwFXLyr8hj8I8LrQ$7vd6LYWLfrzgXSaWiuwXFMkrH6O9t0Jlw+/f4WwyIlQ';

function getRandomRoleId() {
  return Math.floor(Math.random() * 5) + 1; // Random roleId from 1 to 5
}

async function main() {
  const users = Array.from({ length: 50 }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    return {
      name: fullName,
      email,
      password: DUMMY_PASSWORD,
      roleId: getRandomRoleId(),
      slug: uuidv4(),
      profilePicture: '',
    };
  });

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('✅ Seeded 50 fake users with realistic names and emails');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
