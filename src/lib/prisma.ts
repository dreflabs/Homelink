import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async findMany({ model, args, query }) {
          const softDeleteModels = ['User', 'Property', 'PropertyMedia', 'Booking'];
          if (softDeleteModels.includes(model)) {
            args.where = { ...args.where, isDeleted: false };
          }
          return query(args);
        },
        async findUnique({ model, args, query }) {
          const softDeleteModels = ['User', 'Property', 'PropertyMedia', 'Booking'];
          if (softDeleteModels.includes(model)) {
            args.where = { ...args.where, isDeleted: false };
          }
          return query(args);
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
