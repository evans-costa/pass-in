import { prisma } from "../src/lib/prisma";

async function seed() {
  console.log("> Seeding database...");

  await prisma.event.create({
    data: {
      id: "bfa619f2-e367-4190-8e12-e19b19a5ab0c",
      title: "Evento de Tecnologia",
      slug: "evento-de-tecnologia",
      details: "Evento de tecnologia para programadores",
      maximumAttendees: 120,
    },
  });
}

seed()
  .then(async () => {
    console.log("Database seeded");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
