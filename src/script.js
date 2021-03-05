const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function dummy() {
  prisma.link.create({
    data: {
      description: "Fullstack tutorial for GraphQL",
      url: "www.howtographql.com",
    },
  });
}

async function main() {
  await dummy();
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
