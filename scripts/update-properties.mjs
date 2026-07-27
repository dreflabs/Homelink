import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV === 'production' && !process.argv.includes('--confirm')) {
  console.error("ERROR: Script is running in production. Pass --confirm to execute.");
  process.exit(1);
}

const prisma = new PrismaClient();
async function main() {
  const properties = await prisma.property.findMany({ take: 4 });
  if (properties.length === 0) {
    console.log("No properties found. Need to seed.");
    return;
  }
  console.log(`Found ${properties.length} properties.`);
  for (const prop of properties) {
    await prisma.property.update({
      where: { id: prop.id },
      data: { status: 'FULLY_VERIFIED' }
    });
    console.log(`Updated property ${prop.id} to FULLY_VERIFIED`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
