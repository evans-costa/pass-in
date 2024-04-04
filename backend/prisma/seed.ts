import { prisma } from "../src/lib/prisma";
import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

async function seed() {
  console.log("> Seeding database...");

  const eventId = "bfa619f2-e367-4190-8e12-e19b19a5ab0c";

  await prisma.event.deleteMany();

  await prisma.event.create({
    data: {
      id: eventId,
      title: "Evento de Tecnologia",
      slug: "evento-de-tecnologia",
      details: "Evento de tecnologia para programadores",
      maximumAttendees: 120,
    },
  });

  const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = [];

  for (let i = 1; i <= 120; i++) {
    attendeesToInsert.push({
      id: 10000 + i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      createdAt: faker.date.recent({ days: 30, refDate: dayjs().subtract(8, "days").toDate() }),
      eventId,
      ticketId: faker.string.nanoid(10),
      checkIn: faker.helpers.arrayElement<
        Prisma.CheckInUncheckedCreateNestedOneWithoutTicketInput | undefined
      >([
        undefined,
        {
          create: {
            createdAt: faker.date.recent({ days: 7 }),
          },
        },
      ]),
    });
  }

  await Promise.all(
    attendeesToInsert.map((data) => {
      return prisma.attendee.create({
        data,
      });
    })
  );
}

seed()
  .then(async () => {
    console.log("> Database seeded");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
