import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.propertyMedia.deleteMany();
  await prisma.verificationAudit.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding data...');

  // Hash password
  const passwordHash = await argon2.hash('password123');

  // 1. Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@homelink.com' },
    update: {},
    create: {
      email: 'admin@homelink.com',
      name: 'System Admin',
      role: 'ADMIN',
      passwordHash,
      isEmailVerified: true,
    },
  });

  const owner1 = await prisma.user.upsert({
    where: { email: 'owner@homelink.com' },
    update: {},
    create: {
      email: 'owner@homelink.com',
      name: 'Property Owner',
      role: 'OWNER',
      passwordHash,
      isEmailVerified: true,
    },
  });

  const buyer1 = await prisma.user.upsert({
    where: { email: 'buyer@homelink.com' },
    update: {},
    create: {
      email: 'buyer@homelink.com',
      name: 'Happy Buyer',
      role: 'BUYER',
      passwordHash,
      isEmailVerified: true,
    },
  });

  const surveyor1 = await prisma.user.upsert({
    where: { email: 'surveyor@homelink.com' },
    update: {},
    create: {
      email: 'surveyor@homelink.com',
      name: 'Expert Surveyor',
      role: 'SURVEYOR',
      passwordHash,
      isEmailVerified: true,
    },
  });

  console.log('Users created.');

  // 2. Category & Article
  const category1 = await prisma.category.upsert({
    where: { slug: 'tips-and-tricks' },
    update: {},
    create: {
      name: 'Tips & Tricks',
      slug: 'tips-and-tricks',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { slug: 'market-news' },
    update: {},
    create: {
      name: 'Market News',
      slug: 'market-news',
    },
  });

  await prisma.article.upsert({
    where: { slug: 'how-to-buy-first-home' },
    update: {},
    create: {
      title: 'How to Buy Your First Home',
      slug: 'how-to-buy-first-home',
      content: 'Buying your first home can be a daunting task, but we are here to help.',
      status: 'PUBLISHED',
      categoryId: category1.id,
      authorId: admin.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: 'property-market-boom-2026' },
    update: {},
    create: {
      title: 'Property Market Boom 2026',
      slug: 'property-market-boom-2026',
      content: 'The property market is experiencing unprecedented growth this year...',
      status: 'PUBLISHED',
      categoryId: category2.id,
      authorId: admin.id,
    },
  });

  console.log('Category and Article created.');

  // 3. Property
  await prisma.property.create({
    data: {
      ownerId: owner1.id,
      slug: 'beautiful-apartment-in-city-center',
      title: 'Beautiful Apartment in City Center',
      description: 'A newly renovated apartment located in the heart of the city.',
      price: 1500000000,
      propertyType: 'APARTMENT',
      status: 'APPROVED',
      address: '123 Main Street',
      latitude: -6.200000,
      longitude: 106.816666,
    },
  });

  await prisma.property.create({
    data: {
      ownerId: owner1.id,
      slug: 'spacious-villa-with-pool',
      title: 'Spacious Villa with Pool',
      description: 'Perfect for a weekend getaway or retirement.',
      price: 3500000000,
      propertyType: 'VILLA',
      status: 'PENDING',
      address: '456 Suburb Ave',
      latitude: -6.300000,
      longitude: 106.800000,
    },
  });

  console.log('Properties created.');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
