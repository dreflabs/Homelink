import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const owner = await prisma.user.upsert({
    where: { email: 'owner@homelink.com' },
    update: {},
    create: {
      email: 'owner@homelink.com',
      name: 'Property Owner',
      role: 'OWNER',
      passwordHash: 'dummy',
      isEmailVerified: true,
    },
  });

  const properties = [
    {
      title: "Vila Modern Tropis Kemang",
      slug: "vila-modern-tropis-kemang",
      description: "Vila mewah dengan kolam renang pribadi.",
      price: 15500000000,
      propertyType: "HOUSE",
      status: "FULLY_VERIFIED",
      address: "Kemang, Jakarta Selatan",
      bedrooms: 4,
      bathrooms: 4,
      surfaceArea: 450,
      latitude: -6.2700,
      longitude: 106.8100,
      img: "https://images.unsplash.com/photo-1613490908571-9ce2249b49ce?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Penthouse Eksklusif Sudirman",
      slug: "penthouse-eksklusif-sudirman",
      description: "Pemandangan 360 derajat kota Jakarta.",
      price: 25000000000,
      propertyType: "APARTMENT",
      status: "FULLY_VERIFIED",
      address: "Sudirman, Jakarta Pusat",
      bedrooms: 3,
      bathrooms: 3,
      surfaceArea: 320,
      latitude: -6.2100,
      longitude: 106.8200,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Rumah Klasik Pondok Indah",
      slug: "rumah-klasik-pondok-indah",
      description: "Hunian asri di kawasan elit.",
      price: 18000000000,
      propertyType: "HOUSE",
      status: "FULLY_VERIFIED",
      address: "Pondok Indah, Jakarta Selatan",
      bedrooms: 5,
      bathrooms: 4,
      surfaceArea: 500,
      latitude: -6.2800,
      longitude: 106.7800,
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Townhouse BSD City",
      slug: "townhouse-bsd-city",
      description: "Townhouse modern dekat fasilitas CBD.",
      price: 4500000000,
      propertyType: "HOUSE",
      status: "FULLY_VERIFIED",
      address: "BSD City, Tangerang",
      bedrooms: 3,
      bathrooms: 2,
      surfaceArea: 180,
      latitude: -6.3000,
      longitude: 106.6500,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  await prisma.propertyMedia.deleteMany({});
  await prisma.property.deleteMany({});

  for (const prop of properties) {
    const { img, ...data } = prop;
    const p = await prisma.property.create({
      data: {
        ...data,
        ownerId: owner.id,
      }
    });
    
    await prisma.propertyMedia.create({
      data: {
        propertyId: p.id,
        s3Url: img,
        mediaType: 'PHOTO',
        isPrimary: true
      }
    });
  }

  console.log("Successfully seeded 4 FULLY_VERIFIED properties.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
