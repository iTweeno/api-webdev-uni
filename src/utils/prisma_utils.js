import PrismaLib from "@prisma/client";

// eslint-disable-next-line import/no-mutable-exports
let prisma;
if (PrismaLib == null) {
  prisma = PrismaLib;
} else {
  prisma = new PrismaLib.PrismaClient();
}

export default prisma;
